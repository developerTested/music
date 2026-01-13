import { lazy, Suspense, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { cn } from "@/utilities/helper";
import { setShowLoginForm } from "@/redux/slices/appSlice";
import Dialog from '@/components/forms/Dialog/Dialog';
import Spinner from '@/components/Spinner';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
const MusicPlayer = lazy(() => import('@/components/MusicPlayer'));
const LoginForm = lazy(() => import('@/components/forms/LoginForm'));

export function MasterLayout() {

  const { miniMenu, mobileMenu, showLoginForm } = useAppSelector(state => state.app);
  const { user } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const toggleDialog = () => {
    dispatch(setShowLoginForm(false))
  }

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);



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
          className={cn(`
          flex-1 
          p-4 pt-20
          overflow-auto 
          transition-all 
          duration-300
          ml-auto
          ${mobileMenu ? 'ml-0' : ""}
          ${miniMenu ? 'md:ml-20' : "md:ml-60"}
          custom-h
    `)}
        >
          <Outlet />
        </main>
      </div>

      <Suspense fallback={<Spinner size="xl" />}>
        <Footer />
        <MusicPlayer />
      </Suspense>

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
