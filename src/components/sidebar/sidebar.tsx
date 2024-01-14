import React from "react"
import { getChats } from "@/lib/supabase/queries"
import ChatList from "./chat-list"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

type SidebarPropos = {
  params: { workspaceId: string }
}

const Sidebar: React.FC<SidebarPropos> = async () => {
  const supabase = createServerComponentClient({ cookies })

  //user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const allChats = await getChats(user.id)

  return (
    <aside className="w-[280px] shirnk-0 p-4 md:gap-4 sm:flex sm:flex-col">
      <div className="min-h-screen flex flex-col justify-between">
        <div className="max-h-500px relative">
          <ChatList allChats={allChats.data || []} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
