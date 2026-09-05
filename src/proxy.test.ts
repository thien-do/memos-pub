import { NOTFOUND, resolveTxt } from "node:dns/promises";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("node:dns/promises", async (original) => ({
  ...(await original<typeof import("node:dns/promises")>()),
  resolveTxt: vi.fn(),
}));

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("VERCEL_ENV", "production");
  vi.mocked(resolveTxt)
    .mockReset()
    .mockImplementation(async (hostname) => {
      if (["_memos.custom.example", "_memos.mymemos.pub"].includes(hostname)) {
        return [["alice/", "notes"]];
      }
      throw Object.assign(new Error("Missing TXT"), { code: NOTFOUND });
    });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

interface Route {
  hostname: string;
  pathname: string;
  status?: number;
  target?: string;
  dns?: boolean;
}

const routes: Route[] = [
  { hostname: "memos.pub", pathname: "/" },
  { hostname: "memos.pub", pathname: "/blog/alice", status: 404 },
  { hostname: "localhost:3000", pathname: "/blog/alice", status: 404 },
  {
    hostname: "alice.localhost:3000",
    pathname: "/notes?q=1",
    target: "/blog/alice/notes?q=1",
  },
  {
    hostname: "ALICE.MEMOS.PUB",
    pathname: "/blog/notes?q=1",
    target: "/blog/alice/blog/notes?q=1",
  },
  { hostname: "www.memos.pub", pathname: "/" },
  { hostname: "a.b.memos.pub", pathname: "/" },
  {
    hostname: "custom.example",
    pathname: "/post?q=1",
    target: "/blog/alice/notes/post?q=1",
    dns: true,
  },
  {
    hostname: "mymemos.pub",
    pathname: "/",
    target: "/blog/alice/notes",
    dns: true,
  },
  {
    hostname: "branch.vercel.app",
    pathname: "/blog/alice",
    status: 404,
    dns: true,
  },
];

describe.each(["production", undefined, "preview"])(
  "proxy with VERCEL_ENV=%s",
  (environment) => {
    test.each(routes)("$hostname$pathname", async (route) => {
      vi.stubEnv("VERCEL_ENV", environment);
      const { proxy } = await import("./proxy");
      const request = new NextRequest(
        `https://internal.local${route.pathname}`,
        {
          headers: { host: route.hostname },
        },
      );
      const original = request.nextUrl.href;
      const response = await proxy(request);
      const preview = environment === "preview";
      const status = preview ? 200 : (route.status ?? 200);
      const rewrite =
        preview || route.target === undefined
          ? null
          : `https://internal.local${route.target}`;

      expect(response.status).toBe(status);
      expect(response.headers.get("x-middleware-rewrite")).toBe(rewrite);
      expect(response.headers.get("x-middleware-next")).toBe(
        status === 200 && rewrite === null ? "1" : null,
      );
      expect(resolveTxt).toHaveBeenCalledTimes(!preview && route.dns ? 1 : 0);
      expect(request.nextUrl.href).toBe(original);
    });
  },
);

test.each([
  { path: "alice/notes", encoded: "alice/notes" },
  { path: "alice/notes/My folder", encoded: "alice/notes/My%20folder" },
  { path: "%2e%2e", encoded: "%252e%252e" },
  { path: "alice\\..\\..", encoded: "alice%5C..%5C.." },
  { path: "alice/notes/100% done", encoded: "alice/notes/100%25%20done" },
])(
  "encodes TXT target $path as literal segments",
  async ({ path, encoded }) => {
    vi.mocked(resolveTxt).mockResolvedValue([[path]]);
    const { proxy } = await import("./proxy");
    const request = new NextRequest("https://custom.example/post?q=1", {
      headers: { host: "custom.example" },
    });
    const response = await proxy(request);
    expect(response.headers.get("x-middleware-rewrite")).toBe(
      `https://custom.example/blog/${encoded}/post?q=1`,
    );
  },
);
