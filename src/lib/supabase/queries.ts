"use server"
import { eq } from "drizzle-orm"
import { chats } from "../../../migrations/schema"
import db from "./db"
import { Chat } from "./supabase.types"
import { validate } from "uuid"

export const getChats = async (userId: string) => {
  try {
    const data = (await db
      .select()
      .from(chats)
      .orderBy(chats.createdAt)
      .where(eq(chats.chatOwner, userId))) as Chat[]

    return { data, err: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const getChat = async (chatId: string) => {
  const isVaild = validate(chatId)
  if (!isVaild) return { data: [], error: "Error" }
  try {
    const chat = (await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .limit(1)) as Chat[]
    return { data: chat, error: null }
  } catch (err) {
    console.log(err)
    return { data: [], error: "Error" }
  }
}

export const saveChat = async (chat: Chat) => {
  try {
    await db.insert(chats).values(chat)
    return { data: null, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const deleteChat = async (chatId: string) => {
  await db.delete(chats).where(eq(chats.id, chatId))
}

export const updateChat = async (chatId: string, chatData: Partial<Chat>) => {
  const isVaild = validate(chatId)
  if (!isVaild) return { data: null, error: "Error" }
  try {
    await db.update(chats).set(chatData).where(eq(chats.id, chatId))

    return { data: null, error: null }
  } catch (err) {
    console.log(err)
    return { data: null, error: "Error" }
  }
}
