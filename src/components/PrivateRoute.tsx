import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-provider";
import React from "react";

interface PrivateRouteProps {
    children: React.ReactNode;
    allowedRoles?: ("user" | "admin")[];
}

export function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
        return <Navigate to="/profile" replace />;
    }

    return <>{children}</>;
}
