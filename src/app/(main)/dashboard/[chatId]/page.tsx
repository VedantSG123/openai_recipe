import ExistingChat from "@/components/chat/existing-chat"
import { getChat } from "@/lib/supabase/queries"
import { redirect } from "next/navigation"
import React from "react"

const ExistingChatPage = async ({ params }: { params: { chatId: string } }) => {
  const { data, error } = await getChat(params.chatId)
  if (error || data.length === 0) redirect("/dashboard")
  return (
    <div className="max-w-[800px] px-2 sm:px-4 py-6 mx-auto">
      <ExistingChat chatId={params.chatId} />
    </div>
  )
}

export default ExistingChatPage
