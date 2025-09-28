import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admincp/AdminHeader";
import AdminFooter from "../components/admincp/AdminFooter";
import AdminSidebar from "../components/admincp/AdminSidebar";

export function AdminLayout() {
    return (
        <div className="flex flex-col items-center min-h-screen">
            <AdminHeader />
            <main className="flex w-full">
                <AdminSidebar />

                <section className="pl-60 flex-1 min-h-screen">
                    <div className="container p-8">
                        <Outlet />
                    </div>
                </section>
            </main>
            <AdminFooter />
        </div>
    )
}
