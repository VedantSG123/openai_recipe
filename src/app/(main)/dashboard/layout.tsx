import MobileSidebar from "@/components/sidebar/mobile-sidebar"
import Sidebar from "@/components/sidebar/sidebar"
import SupabaseUserProvider from "@/lib/providers/user-provider"
type LayoutPropos = {
  children: React.ReactNode
  params: any
}

const Layout: React.FC<LayoutPropos> = ({ children, params }) => {
  return (
    <SupabaseUserProvider>
      <main className="sm:flex block h-screen w-screen overflow-hidden">
        <div className="hidden sm:block">
          <Sidebar />
        </div>

        <MobileSidebar />
        <div
          className="dark:border-neutrals-8/70
        border-l-[1px]
        w-full
        h-full
        relative
        overflow-y-auto
        flex-1
        "
        >
          {children}
        </div>
      </main>
    </SupabaseUserProvider>
  )
}

export default Layout
