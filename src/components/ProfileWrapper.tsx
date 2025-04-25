import { useAuth } from "@/providers/auth-provider";
import { ProfilePage } from "@/pages/ProfilePage";

export function ProfileWrapper() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return <ProfilePage />;
}