"use client"

import { AuthUser } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type SupabaseUserContextType = {
  user: AuthUser | null
}

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
})

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext)
}

type SupabaseUserProviderProps = {
  children: React.ReactNode
}

const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const supabase = createClientComponentClient()

  //fetch user details
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        console.log("❌ User not found")
      }
    }
    getUser()
  }, [supabase])
  return (
    <SupabaseUserContext.Provider value={{ user }}>
      {children}
    </SupabaseUserContext.Provider>
  )
}

export default SupabaseUserProvider
