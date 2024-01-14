import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import React from "react"
import NewChat from "@/components/chat/new-chat"

const DashboardPage = async () => {
  const supbase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supbase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="max-w-[800px] px-4 py-6 mx-auto">
      <NewChat />
    </div>
  )
}

export default DashboardPage
