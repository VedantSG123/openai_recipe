"use client"

import { createContext, Dispatch, useReducer, useContext } from "react"
import { usePathname } from "next/navigation"
import { Chat } from "../supabase/supabase.types"

type appChats = Chat[] | []

type AppState = {
  chats: appChats
}

const initialState: AppState = {
  chats: [],
}

type Action =
  | { type: "SET_CHATS"; payload: appChats }
  | { type: "ADD_CHAT"; payload: Chat }
  | {
      type: "UPDATE_CHAT"
      payload: { chatId: string; chatData: Partial<Chat> }
    }
  | {
      type: "DELETE_CHAT"
      payload: string
    }

const appReducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case "SET_CHATS":
      return {
        ...state,
        chats: action.payload,
      }
    case "ADD_CHAT":
      return {
        ...state,
        chats: [...state.chats, action.payload],
      }
    case "UPDATE_CHAT":
      return {
        ...state,
        chats: state.chats.map((chat) => {
          if (chat.id === action.payload.chatId) {
            return {
              ...chat,
              ...action.payload.chatData,
            }
          }
          return chat
        }),
      }
    case "DELETE_CHAT":
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload),
      }
    default:
      return initialState
  }
}

const AppStateContext = createContext<
  | {
      state: AppState
      dispatch: Dispatch<Action>
    }
  | undefined
>(undefined)

type AppStateProviderProps = {
  children: React.ReactNode
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default AppStateProvider

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvide")
  }
  return context
}
