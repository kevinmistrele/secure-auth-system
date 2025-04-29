import {AdminPage} from "@/pages/AdminPage";
import {useAuth} from "@/providers/auth-provider.tsx";
import {Navigate} from "react-router-dom";

export function AdminWrapper() {
    const { user } = useAuth();
    console.log("usuario: ", user)
    if (!user || user.role !== "admin") {
        return <Navigate to="/profile" replace />;
    }

    return <AdminPage />;
}