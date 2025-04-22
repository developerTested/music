import { Outlet } from "react-router-dom";
import { Footer, Header, MusicPlayer, Sidebar } from "../components";

export function MasterLayout() {
  return (
    <div className="dark:bg-midnight dark:text-slate-200 block size-full min-h-screen">
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
