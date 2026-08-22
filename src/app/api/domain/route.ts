import { NextResponse } from "next/server";
import { z } from "zod";
import { checkDomainTxt } from "@/domain/check";

const Body = z.object({ host: z.string() });

export async function POST(request: Request): Promise<NextResponse> {
  const parsed = Body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ target: null });
  }

  const target = await checkDomainTxt(parsed.data.host);
  return NextResponse.json({ target });
}
