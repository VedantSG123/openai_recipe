"use server"
import { eq } from "drizzle-orm"
import { chats } from "../../../migrations/schema"
import db from "./db"
import { Chat } from "./supabase.types"
export const getChats = async (userId: string) => {
  try {
    const data = (await db
      .select()
      .from(chats)
      .where(eq(chats.chatOwner, userId))) as Chat[]

    return { data, err: null }
  } catch (err) {
    return { data: null, error: err }
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
