"use client"
import { useAppState } from "@/lib/providers/app-state-provider"
import { Chat } from "@/lib/supabase/supabase.types"
import React, { useEffect } from "react"
import { ScrollArea } from "../ui/scroll-area"
import Link from "next/link"
import { Button } from "../ui/button"

type ChatListProps = {
  allChats: Chat[] | []
}

const ChatList: React.FC<ChatListProps> = ({ allChats }) => {
  const { state, dispatch } = useAppState()

  useEffect(() => {
    if (!state.chats.length) {
      dispatch({
        type: "SET_CHATS",
        payload: allChats,
      })
    }
  }, [allChats])
  return (
    <div>
      <Link href={"/dashboard"}>
        <Button>New Chat</Button>
      </Link>

      <ScrollArea className="h-[400px]">
        {state.chats.map((chat) => {
          return (
            <div
              key={chat.id}
              className="w-full overflow-clip my-2 block sm:max-w-[270px]"
            >
              <Link href={`/dashboard/${chat.id}`}>
                <div className="w-full bg-primary dark:bg-muted p-4 rounded-md overflow-hidden relative">
                  <div className="w-1/3 h-full absolute top-0 right-0 z-20 bg-gradient-to-l from-primary to-transparent dark:from-muted dark:to-transparent"></div>
                  <div className="w-full whitespace-nowrap text-primary-foreground dark:text-foreground">
                    {chat.ingredients}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </ScrollArea>
    </div>
  )
}

export default ChatList
