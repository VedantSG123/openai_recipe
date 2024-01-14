import { mainInstructions } from "@/lib/prompts/prompts"
import type { NextApiRequest, NextApiResponse } from "next"
import OpenAI from "openai"

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_KEY,
})

export async function POST(req: Request, res: NextApiResponse) {
  const { prompt } = await req.json()

  if (!prompt || prompt === "") {
    return new Response("Please provide some input", { status: 400 })
  }

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: mainInstructions },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
  })

  const response = chatCompletion.choices[0].message.content
  res.status(200).json({ text: response })
}
