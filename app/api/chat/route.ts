import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

export const runtime = "nodejs"

type ClientMessage = {
  role: "user" | "model"
  content: string
}

function isClientMessage(value: unknown): value is ClientMessage {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return (
    (v.role === "user" || v.role === "model") &&
    typeof v.content === "string" &&
    v.content.trim().length > 0
  )
}

export async function POST(req: Request) {
  try {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Server is missing a Gemini API key. Set GEMINI_API_KEY (preferred) in .env.local (recommended) or .env.",
        },
        { status: 500 },
      )
    }

    const body = (await req.json()) as unknown
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Expected JSON object body" }, { status: 400 })
    }

    const messagesRaw = (body as { messages?: unknown }).messages

    if (!Array.isArray(messagesRaw)) {
      return NextResponse.json({ error: "Expected { messages: [] }" }, { status: 400 })
    }

    const messages = messagesRaw.filter(isClientMessage).slice(-20)
    if (messages.length === 0) {
      return NextResponse.json({ error: "messages must be a non-empty array" }, { status: 400 })
    }

    const last = messages[messages.length - 1]
    if (last.role !== "user") {
      return NextResponse.json(
        { error: "Last message must have role 'user'" },
        { status: 400 },
      )
    }

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }))

    const ai = new GoogleGenAI({ apiKey })
    const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash"

    const chat = ai.chats.create({
      model,
      history,
    })

    const result = await chat.sendMessage({ message: last.content })
    const reply = (result.text ?? "").trim()

    return NextResponse.json({ reply: reply || "(No response text returned.)" })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
