"use client"
import React from "react"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { useAppState } from "@/lib/providers/app-state-provider"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const Logout = () => {
  const { dispatch } = useAppState()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const logout = async () => {
    await supabase.auth.signOut()
    router.push("/api/auth/logout")
    router.replace("/")
    dispatch({ type: "SET_CHATS", payload: [] })
  }
  return (
    <Button variant={"outline"} size="icon" onClick={logout}>
      <LogOut
        className="h-[1.2rem] 
        w-[1.2rem]
         rotate-0 
         scale-100 
         transition-all"
      />
    </Button>
  )
}

export default Logout
