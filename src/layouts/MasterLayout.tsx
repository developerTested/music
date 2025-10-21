import { Outlet } from "react-router-dom";
import { Footer, Header, MusicPlayer, Sidebar } from "../components";
import { useAppSelector } from "@/hooks";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utilities/helper";

export function MasterLayout() {

  const { miniMenu, mobileMenu } = useAppSelector(state => state.app);

  return (
    <div
      className={cn(
        "block min-h-screen w-full dark:bg-zinc-950 dark:text-slate-200",
        "min-h-screen text-zinc-900 dark:text-zinc-100 bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700"
    )}
    >
      <Header />

      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          className={twMerge(`
          flex-1 
          p-4
          overflow-auto 
          transition-all 
          duration-300
          ml-auto
          ${mobileMenu ? 'ml-0' : ""}
          ${miniMenu ? 'md:ml-20' : "md:ml-60"}
    `)}
        >
          <div className="custom-h p-4">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
      <MusicPlayer />
    </div >
  )
}
