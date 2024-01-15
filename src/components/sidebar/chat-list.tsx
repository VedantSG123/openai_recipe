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

      <ScrollArea className="h-[400px] mt-4">
        {state.chats.map((chat) => {
          return (
            <div
              key={chat.id}
              className="w-full overflow-clip my-2 block sm:max-w-[270px]"
            >
              <Link href={`/dashboard/${chat.id}`}>
                <div className="w-full bg-primary dark:bg-muted h-12 rounded-md overflow-hidden relative">
                  <div className="w-1/3 h-full absolute top-0 right-0 z-20 bg-gradient-to-l from-primary to-transparent dark:from-muted dark:to-transparent"></div>
                  <div className="w-full whitespace-nowrap text-primary-foreground dark:text-foreground absolute top-1/2 left-2 -translate-y-1/2">
                    {chat.ingredients}
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
        <div className="w-full py-20"></div>
      </ScrollArea>
      <div className="absolute w-full h-[50px] z-30 bg-gradient-to-t from-background to-transparent bottom-0 left-0"></div>
    </div>
  )
}

export default ChatList
