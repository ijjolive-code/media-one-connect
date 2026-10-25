import { NextResponse, type NextRequest } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { answer } from "@/modules/concierge/service";
import { venues } from "@/modules/knowledge/types";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expected =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const localCodespace =
    process.env.CODESPACES === "true" && origin === "http://localhost:3000";
  let originHost: string | null = null;
  try {
    originHost = origin ? new URL(origin).host : null;
  } catch {
    return NextResponse.json(
      { message: "Origin not allowed." },
      { status: 403 },
    );
  }
  if (origin && originHost !== expected && !localCodespace)
    return NextResponse.json(
      { message: "Origin not allowed." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") ?? 0) > 6000)
    return NextResponse.json({ message: "Message too long." }, { status: 413 });
  let body;
  try {
    const reader = request.body?.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    if (!reader) throw new Error("Missing body");
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > 6000) {
        await reader.cancel();
        return NextResponse.json(
          { message: "Message too long." },
          { status: 413 },
        );
      }
      chunks.push(part.value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json({ message: "Invalid message." }, { status: 400 });
  }
  if (
    !body ||
    typeof body !== "object" ||
    typeof body.question !== "string" ||
    !body.question.trim() ||
    body.question.length > 1000 ||
    !venues.some((v) => v.slug === body.venue)
  )
    return NextResponse.json(
      {
        message:
          "Enter a question of up to 1,000 characters and select a venue.",
      },
      { status: 400 },
    );
  const raw = request.cookies.get("m2a-session")?.value;
  const session =
    raw && /^[a-f0-9]{64}$/.test(raw) ? raw : randomBytes(32).toString("hex");
  const result = await answer(
    body.question.trim(),
    body.venue,
    createHash("sha256").update(session).digest("hex"),
  );
  const response = NextResponse.json(result.body, {
    status: result.status,
    headers: { "Cache-Control": "private, no-store" },
  });
  response.cookies.set("m2a-session", session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.APP_COOKIE_SECURE === "true",
    maxAge: 86400,
    path: "/",
  });
  return response;
}
