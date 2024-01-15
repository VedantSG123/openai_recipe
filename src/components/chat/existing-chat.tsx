"use client"
import React, { useEffect, useState } from "react"
import ListInput from "./list-input"
import IngredientsList from "./ingredients-list"
import { Button } from "../ui/button"
import { useToast } from "../ui/use-toast"
import { useSupabaseUser } from "@/lib/providers/user-provider"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { useAppState } from "@/lib/providers/app-state-provider"
import { updateChat, deleteChat as deleteQuery } from "@/lib/supabase/queries"
import { useRouter } from "next/navigation"

type ExistingChatProps = {
  chatId: string
}

const ExistingChat: React.FC<ExistingChatProps> = ({ chatId }) => {
  const { toast } = useToast()
  const { user } = useSupabaseUser()
  const { state, dispatch } = useAppState()
  const router = useRouter()
  const [ingredients, setIngredients] = useState<string[] | []>([])
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
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

  const deleteChat = async () => {
    dispatch({
      type: "DELETE_CHAT",
      payload: chatId,
    })

    await deleteQuery(chatId)
    router.replace("/dashboard")
  }

  const callApi = async () => {
    if (ingredients.length === 0) return
    setLoading(true)
    setResponse("")

    const ingredientListString = ingredients.join(", ")

    await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: ingredientListString,
        precision: responseType,
      }),
    })
      .then(async (response: any) => {
        const reader = response.body?.getReader()

        while (true) {
          const { done, value } = await reader?.read()
          if (done) {
            break
          }

          var current = new TextDecoder().decode(value)
          setResponse((prev) => prev + current)
        }
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to get response",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateChatData = async () => {
    if (!user) return
    const chatData = {
      responseType,
      response,
      ingredients: ingredients.join(", "),
    }
    dispatch({
      type: "UPDATE_CHAT",
      payload: {
        chatId,
        chatData,
      },
    })

    const { error } = await updateChat(chatId, chatData)
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
  }

  useEffect(() => {
    const chat = state.chats.find((chat) => chat.id === chatId)
    if (!chat) {
      return
    }
    setIngredients(chat.ingredients?.split(", ") || [])
    setResponse(chat.response || "")
    setResponseType(chat.responseType || "Normal")
  }, [state])

  return (
    <div className="max-w-[800px] px-2 sm:px-4 py-6 mx-auto flex flex-col gap-4">
      {editing ? (
        <div>
          <Tabs defaultValue={responseType} value={responseType}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                onClick={() => setPrecision("Normal")}
                value="Normal"
              >
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
      ) : (
        <div>
          <Button onClick={() => setEditing(true)}>Edit Chat</Button>
        </div>
      )}
      <IngredientsList
        list={ingredients}
        editable={editing}
        removeItem={removeItem}
      />
      {editing && (
        <>
          <ListInput
            getValue={getValue}
            placeholder={loading ? "Generating..." : "Ingredients"}
            disabled={loading}
          />
          <div className="flex justify-between">
            <Button
              className="bg-emerald-400 hover:bg-emerald-300"
              onClick={callApi}
              disabled={loading}
            >
              {response.length === 0 ? "Generate" : "Regenerate"}
            </Button>
            <div className="flex gap-2">
              <Button disabled={loading} onClick={updateChatData}>
                Save
              </Button>
              <Button
                disabled={loading}
                variant={"destructive"}
                onClick={deleteChat}
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      )}

      {response.length !== 0 && (
        <div className="p-4 rounded-md border">{response}</div>
      )}
    </div>
  )
}

export default ExistingChat
