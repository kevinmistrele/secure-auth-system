import { useAuth } from "@/providers/auth-provider";
import {UserPage} from "@/pages/UserPage.tsx";

export function ProfileWrapper() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return <UserPage />;
}