import { Outlet } from "react-router-dom";
import { Footer, Header, MusicPlayer, Sidebar } from "../components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utilities/helper";
import { Dialog, LoginForm } from "@/components/forms";
import { setShowLoginForm } from "@/redux/slices/appSlice";

export function MasterLayout() {

  const { miniMenu, mobileMenu, showLoginForm } = useAppSelector(state => state.app);
  const { user } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const toggleDialog = () => {
    dispatch(setShowLoginForm(false))
  }

  return (
    <div
      className={cn(
        "block w-full min-h-screen",
        "dark:bg-zinc-950",
        "text-zinc-900 dark:text-zinc-100"
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

      {!user &&
        <Dialog
          open={showLoginForm}
          onClose={toggleDialog}
          size="lg"
        >
          <Dialog.Content hasCloseButton={true}>
            <LoginForm />
          </Dialog.Content>
        </Dialog>
      }
    </div>
  )
}
