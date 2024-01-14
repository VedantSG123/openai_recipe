"use client"
import React, { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Input } from "../ui/input"
import { FileSpreadsheetIcon, Plus } from "lucide-react"

type ListInputProps = {
  getValue: (val: string) => void
  className?: string
  disabled?: boolean
  placeholder?: string
}

const ListInput: React.FC<ListInputProps> = ({
  getValue,
  className,
  disabled = false,
  placeholder = "",
}) => {
  const [value, setValue] = useState("")

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClick = () => {
    if (disabled === true) return
    getValue(value)
    setValue("")
  }

  return (
    <div className={twMerge("flex gap-2 items-center", className)}>
      <Input
        type="text"
        onChange={onTextChange}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
      />
      <div className="bg-primary p-2 rounded-md">
        <Plus
          onClick={handleClick}
          className="cursor-pointer text-primary-foreground"
          size={26}
        />
      </div>
    </div>
  )
}

export default ListInput
