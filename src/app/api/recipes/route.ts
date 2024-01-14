import {
  PreciseSystemInstructions,
  NormalSystemInstructions,
  PreciseAssistantInstructions,
  NormalAssistantInstructions,
} from "@/lib/prompts/prompts"
import type { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request, res: NextApiResponse) {
  let { prompt, precision } = await req.json()

  if (!prompt || prompt === "") {
    return new Response("Please provide some input", { status: 400 })
  }

  if (!precision) precision = "Normal"
  const systemInstructions =
    precision === "Precise"
      ? PreciseSystemInstructions
      : NormalSystemInstructions
  const assistantInstructions =
    precision === "Precise"
      ? PreciseAssistantInstructions
      : NormalAssistantInstructions

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemInstructions },
      { role: "assistant", content: assistantInstructions },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
  })

  const response = chatCompletion.choices[0].message.content
  return new Response(JSON.stringify({ text: response }), { status: 200 })
}
