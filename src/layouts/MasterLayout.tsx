import { Outlet } from "react-router-dom";
import { Footer, Header, MusicPlayer, Sidebar } from "../components";
import { useAppSelector } from "@/hooks";
import { twMerge } from "tailwind-merge";

export function MasterLayout() {

  const { miniMenu, mobileMenu } = useAppSelector(state => state.app);

  return (
    <div
      className={`
        block min-h-screen w-full dark:bg-zinc-950 dark:text-slate-200
    `}
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
