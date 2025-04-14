import {addLog} from "@/services/log-service.ts";

interface User {
    fullName: string;
    email: string;
    password: string;
    role: "User" | "Admin";
}

const users: User[] = [
    {
        fullName: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "Admin",
    },
    {
        fullName: "Normal User",
        email: "user@example.com",
        password: "user123",
        role: "User",
    },
];

export async function requestPasswordReset(email: string): Promise<boolean> {
    const user = users.find(u => u.email === email);
    return Boolean(user);
}

export async function resetPassword(email: string, newPassword: string): Promise<boolean> {
    const user = users.find(u => u.email === email);
    if (user) {
        user.password = newPassword;
        addLog(`Password reset for: ${email}`);
        return true;
    }
    return false;
}
