import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 h-screen">
      <p className="text-semibold text-xl">Open AI Chat API</p>
      <Link href={"/login"}>
        <Button>Get Started</Button>
      </Link>
    </main>
  )
}
