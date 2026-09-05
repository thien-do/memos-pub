import { BADNAME, NODATA, NOTFOUND, resolveTxt } from "node:dns/promises";
import { beforeEach, expect, test, vi } from "vitest";
import { getHostCustomPath } from "./custom";

vi.mock("node:dns/promises", async (original) => ({
  ...(await original<typeof import("node:dns/promises")>()),
  resolveTxt: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(resolveTxt).mockReset();
});

test.each([
  "",
  ".",
  "..",
  "alice/../notes",
  "alice/",
  "/alice",
  "alice//notes",
])("rejects invalid TXT target %j", async (path) => {
  vi.mocked(resolveTxt).mockResolvedValue([[path]]);
  expect(await getHostCustomPath("notes.example.com")).toBeNull();
});

test("joins TXT chunks and returns a plain content path", async () => {
  vi.mocked(resolveTxt).mockResolvedValue([["alice/notes/", "My folder"]]);
  expect(await getHostCustomPath("notes.example.com")).toBe(
    "alice/notes/My folder",
  );
  expect(resolveTxt).toHaveBeenCalledWith("_memos.notes.example.com");
});

test.each([BADNAME, NODATA, NOTFOUND])(
  "treats DNS %s as no mapping",
  async (code) => {
    vi.mocked(resolveTxt).mockRejectedValue(
      Object.assign(new Error("DNS"), { code }),
    );
    expect(await getHostCustomPath("notes.example.com")).toBeNull();
  },
);

test("propagates unexpected DNS failures", async () => {
  const error = Object.assign(new Error("DNS timeout"), { code: "ETIMEOUT" });
  vi.mocked(resolveTxt).mockRejectedValue(error);
  await expect(getHostCustomPath("notes.example.com")).rejects.toBe(error);
});
