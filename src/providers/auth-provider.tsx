import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addLog } from "@/services/log-service";
import { toast } from "sonner";

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: "user" | "admin";
    token?: string;
}

export interface UpdateProfileData {
    fullName: string;
    email?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    deleteAccount: () => void;
    updateProfile: (data: UpdateProfileData) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedEmail = localStorage.getItem("email");
        const storedFullName = localStorage.getItem("fullName");
        const storedUserId = localStorage.getItem("id");
        if (storedToken && storedRole) {
            const storedUser = {
                id: storedUserId,
                fullName: storedFullName,
                email: storedEmail,
                role: storedRole as "admin" | "user",
                token: storedToken,
            };
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        setUser({ ...userData, token });
        localStorage.setItem("token", token);
        localStorage.setItem("role", userData.role);
        addLog(`User logged in: ${userData.email}`);
        toast.success("Welcome back!");
    };

    const logout = () => {
        if (user) {
            addLog(`User logged out: ${user.email}`);
        }
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    const updateProfile = (data: UpdateProfileData) => {
        console.log("Updating profile", data);
        if (user) {
            setUser({
                ...user,
                ...data,
            });
        }
    };

    const deleteAccount = () => {
        if (user) {
            addLog(`User deleted account: ${user.email}`);
            toast.success("Your account has been deleted!");
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, login, logout, updateProfile, deleteAccount, isLoading }}
        >
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
