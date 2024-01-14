import React from "react"
import { Badge } from "../ui/badge"
import { XCircle } from "lucide-react"

type IngredientsListProps = {
  list: string[] | []
  editable: boolean
  removeItem?: (index: number) => void
}

const IngredientsList: React.FC<IngredientsListProps> = ({
  list,
  editable,
  removeItem,
}) => {
  return (
    <div className="w-full flex flex-wrap p-4 gap-2 rounded-md border">
      {list.length === 0 ? (
        <p>No Ingredients ☹️</p>
      ) : (
        list.map((item, index) => {
          return (
            <Badge key={index} className="bg-primary text-primary-foreground">
              <span className="flex gap-2 items-center py-2">
                {item}
                {editable && (
                  <XCircle
                    size={16}
                    onClick={() => {
                      if (removeItem) removeItem(index)
                    }}
                    className="cursor-pointer"
                  />
                )}
              </span>
            </Badge>
          )
        })
      )}
    </div>
  )
}

export default IngredientsList
