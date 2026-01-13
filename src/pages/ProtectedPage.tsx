import AccessDenied from "@/components/AccessDenied";
import { useAppSelector } from "@/hooks";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedPageProps = {
    role?: string,
}

export default function ProtectedPage({ role }: ProtectedPageProps) {
    const { user } = useAppSelector((state) => state.auth);

    if (role === "guest") {
        return user ? <Navigate to="/" replace /> : <Outlet />;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (role && user.role !== role) {
        return <AccessDenied />;
    }

    return <Outlet />;
};