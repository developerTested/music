import { Outlet } from "react-router-dom";
import { Footer, Header, MusicPlayer, Sidebar } from "../components";
import { useAppSelector } from "@/hooks";

export function MasterLayout() {

  const { darkMode } = useAppSelector(state => state.app);

  return (
    <div className={`dark:bg-midnight dark:text-slate-200 block size-full min-h-screen
      ${darkMode ?
        'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white' :
        'bg-gradient-to-br from-gray-100 via-purple-100 to-violet-100 text-gray-900'}
        `}
    >

      <Header />

      <div className="flex gap-2 p-4 min-h-screen">
        <Sidebar />
        <main className="ml-0 lg:ml-60 size-full">
          <Outlet />
        </main>
      </div>
      <Footer />
      <MusicPlayer />
    </div>
  )
}
