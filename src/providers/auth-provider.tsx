import { createContext, useContext, useState, ReactNode } from "react";
import { addLog } from "@/services/log-service";
import {toast} from "sonner";

interface User {
    fullName: string;
    email: string;
    role: "User" | "Admin";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
    deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
        addLog(`User logged in: ${userData.email}`);
    };

    const logout = () => {
        if (user) {
            addLog(`User logged out: ${user.email}`);
        }
        setUser(null);
    };

    const deleteAccount = () => {
        if (user) {
            addLog(`User deleted account: ${user.email}`);
            toast.success("Your account has been deleted!");
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
