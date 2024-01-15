import React from "react"
import { getChats } from "@/lib/supabase/queries"
import ChatList from "./chat-list"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import ToggleTheme from "../global/theme-toggle"
import Logout from "../global/logout"

const Sidebar = async () => {
  const supabase = createServerComponentClient({ cookies })

  //user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const allChats = await getChats(user.id)

  return (
    <aside className="w-full sm:w-[280px] shirnk-0 p-4 md:gap-4 flex flex-col">
      <div className="sm:min-h-[calc(100vh-40px)] flex flex-col justify-between">
        <div className="max-h-500px relative">
          <ChatList allChats={allChats.data || []} />
        </div>
        <div className="w-full relative border rounded-md h-16 px-2 mt-4 sm:mt-0">
          <div className="oveflow-hidden whitespace-nowrap absolute top-1/2 left-2 -translate-y-1/2">{user.email}</div>
          <div className="flex gap-2 absolute top-1/2 -translate-y-1/2 right-0 p-2 justify-end w-1/2 bg-gradient-to-l from-background to-transparent">
            <ToggleTheme />
            <Logout />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
