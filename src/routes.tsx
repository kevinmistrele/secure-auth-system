import { Routes, Route } from 'react-router-dom';
import {LoginPage} from "@/pages/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage.tsx";
import {ForgotPasswordPage} from "@/pages/ForgotPasswordPage.tsx";
import {ResetPasswordPage} from "@/pages/ResetPasswordPage.tsx";
import {PrivateRoute} from "@/components/PrivateRoute.tsx";
import {ProfileWrapper} from "@/components/ProfileWrapper.tsx";
import {AdminWrapper} from "@/components/AdminWrapper.tsx";

function AppRoutes() {
    console.log("Rendering Routes...");

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Rota protegida para Profile */}
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <ProfileWrapper />
                    </PrivateRoute>
                }
            />

            {/* Rota protegida para Admin (somente Admin pode acessar) */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute allowedRoles={["admin"]}>
                        <AdminWrapper />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
