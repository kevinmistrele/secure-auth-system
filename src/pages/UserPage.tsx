import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { userStore } from "@/stores/user-store"
import { ProfilePage } from "@/pages/ProfilePage"

export function UserPage() {
    const [activeTab, setActiveTab] = useState<"profile">("profile")
    const navigate = useNavigate()

    const logout = () => {
        userStore.clear()
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div className="flex min-h-screen bg-background">
            <div className="hidden md:flex flex-col w-64 border-r bg-gray-100 h-screen">
                <div className="p-4 text-xl font-bold border-b">User Dashboard</div>

                <div className="flex flex-col justify-between h-full">
                    <div className="py-4">
                        <div className="px-4 py-2">
                            <Button
                                variant={activeTab === "profile" ? "default" : "ghost"}
                                className="w-full justify-start gap-2"
                                onClick={() => setActiveTab("profile")}
                            >
                                <Users size={18} />
                                Profile
                            </Button>
                        </div>
                    </div>

                    <div className="p-4 border-t mt-auto">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-red-500"
                            onClick={logout}
                        >
                            <LogOut size={18} />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="md:hidden p-4 border-b flex justify-between items-center">
                    <span className="text-xl font-bold">User Dashboard</span>

                    <div className="flex gap-2">
                        <Button
                            variant={activeTab === "profile" ? "default" : "ghost"}
                            size="icon"
                            onClick={() => setActiveTab("profile")}
                        >
                            <Users size={20} />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500"
                            onClick={logout}
                        >
                            <LogOut size={20} />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-auto flex justify-center items-center">
                    {activeTab === "profile" && <ProfilePage />}
                </div>
            </div>
        </div>
    )
}
