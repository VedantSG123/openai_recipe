"use client"
import React, { useState } from "react"
import ListInput from "./list-input"
import IngredientsList from "./ingredients-list"
import { Button } from "../ui/button"
import Loader from "../global/Loader"
import { useToast } from "../ui/use-toast"
import { v4 } from "uuid"
import { Chat } from "@/lib/supabase/supabase.types"
import { useSupabaseUser } from "@/lib/providers/user-provider"
import { saveChat } from "@/lib/supabase/queries"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { useAppState } from "@/lib/providers/app-state-provider"

const NewChat = () => {
  const { toast } = useToast()
  const { user } = useSupabaseUser()
  const { dispatch } = useAppState()
  const [ingredients, setIngredients] = useState<string[] | []>([])
  const [editing, setEditing] = useState(true)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("New recipe from chat gpt 3.5")
  const [responseType, setResponseType] = useState("Normal")

  const getValue = (val: string) => {
    if (val !== "") {
      setIngredients([...ingredients, val])
    }
  }

  const removeItem = (index: number) => {
    if (index >= 0 && index < ingredients.length) {
      const newArr = ingredients.filter((item, ind) => ind !== index)
      setIngredients(newArr)
    }
  }

  const setPrecision = (val: string) => {
    setResponseType(val)
  }

  const resetChat = () => {
    setIngredients([])
    setResponse("")
    setResponseType("Normal")
  }

  const callApi = async () => {
    if (ingredients.length === 0) return
    setEditing(false)
    setLoading(true)
    const ingredientListFormat = ingredients.map(
      (item, index) => `${1 + index}. ${item}`
    )

    const ingredientListString = ingredientListFormat.join("\n")
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: ingredientListString }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const responseData = await response.json()
      console.log(responseData)
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setEditing(true)
    }
  }

  const saveNewChat = async () => {
    if (!user || ingredients.length === 0) return
    setLoading(true)
    const newChat: Chat = {
      id: v4(),
      chatOwner: user.id,
      createdAt: new Date().toISOString(),
      indredients: ingredients.join(", "),
      response: response,
      responseType: responseType,
    }

    dispatch({
      type: "ADD_CHAT",
      payload: newChat,
    })

    const { error } = await saveChat(newChat)
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to save the chat",
      })
    } else {
      toast({
        title: "Success",
        description: "Chat saved",
      })
    }
    setLoading(false)
  }

  return (
    <div className="max-w-[800px] px-4 py-6 mx-auto flex flex-col gap-4">
      <div>
        <Tabs defaultValue="Normal" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger onClick={() => setPrecision("Normal")} value="Normal">
              Normal
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setPrecision("Precise")}
              value="Precise"
            >
              More Precise
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <IngredientsList
        list={ingredients}
        editable={editing}
        removeItem={removeItem}
      />
      <ListInput
        getValue={getValue}
        placeholder={loading ? "Generating..." : "Ingredients"}
        disabled={!editing}
      />
      <div className="flex justify-between">
        <Button
          className="bg-emerald-400 hover:bg-emerald-300"
          onClick={callApi}
        >
          {loading ? (
            <Loader />
          ) : response.length === 0 ? (
            "Generate"
          ) : (
            "Regenerate"
          )}
        </Button>
        <div className="flex gap-2">
          <Button
            disabled={response.length === 0 || loading}
            onClick={saveNewChat}
          >
            Save
          </Button>
          <Button
            disabled={response.length === 0 || loading}
            variant={"destructive"}
            onClick={resetChat}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="p-4 rounded-md border">{response}</div>
    </div>
  )
}

export default NewChat
