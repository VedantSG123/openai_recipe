"use server"
import { FormSchema } from "../types"
import { z } from "zod"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { AuthResponse } from "@supabase/supabase-js"
export const loginGoogleUser = async () => {
  const supabase = createRouteHandlerClient({ cookies })
  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
  })
  console.log(response)
  return response
}

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return response
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })

  const response: AuthResponse = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  })
  return response
}
