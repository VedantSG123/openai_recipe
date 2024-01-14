import React from "react"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import Sidebar from "./sidebar"
const MobileSidebar = () => {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="mt-2 ml-2" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Open AI Recipe</SheetTitle>
          </SheetHeader>
          <div>
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileSidebar
