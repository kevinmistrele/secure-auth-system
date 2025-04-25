import {AdminPage} from "@/pages/AdminPage";
import {useAuth} from "@/providers/auth-provider.tsx";
import {Navigate} from "react-router-dom";

export function AdminWrapper() {
    const { user } = useAuth();
    console.log("usuario: ", user)
    // Se não houver usuário ou se o usuário não for admin, redireciona para o perfil
    if (!user || user.role !== "admin") {
        return <Navigate to="/profile" replace />;
    }

    // Se for admin, renderiza a página de administração
    return <AdminPage />;
}