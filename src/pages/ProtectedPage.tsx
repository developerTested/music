import { AccessDenied } from "@/components";
import { useAppSelector } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedPageProps = {
    role?: string,
}

export function ProtectedPage({ role }: ProtectedPageProps) {
    const { user } = useAppSelector((state) => state.auth);

    if (role === "guest") {
        return <Outlet />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <AccessDenied />;
    }

    return <Outlet />;
};