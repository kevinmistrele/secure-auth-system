"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Users, ClipboardList, ShieldPlus } from "lucide-react"
import { UsersComponent } from "@/components/UsersComponent.tsx"
import { LogsComponent } from "@/components/LogsComponent.tsx"
import { CreateAdminComponent } from "@/components/CreateAdminComponent.tsx"
import { Toaster } from "sonner"

export function AdminPage() {
    const [activeTab, setActiveTab] = useState<"users" | "logs" | "create-admin">("users")

    return (
        <div className="flex min-h-screen bg-background">
            <div className="hidden md:flex flex-col w-64 border-r bg-gray-100">
                <div className="p-4 text-xl font-bold border-b">Admin Dashboard</div>
                <div className="flex-1 py-4">
                    <div className="px-4 py-2">
                        <Button
                            variant={activeTab === "users" ? "default" : "ghost"}
                            className="w-full justify-start gap-2 font-medium cursor-pointer"
                            onClick={() => setActiveTab("users")}
                        >
                            <Users size={18} />
                            Users
                        </Button>
                    </div>
                    <div className="px-4 py-2">
                        <Button
                            variant={activeTab === "logs" ? "default" : "ghost"}
                            className="w-full justify-start gap-2 font-medium cursor-pointer"
                            onClick={() => setActiveTab("logs")}
                        >
                            <ClipboardList size={18} />
                            Logs
                        </Button>
                    </div>
                    <div className="px-4 py-2">
                        <Button
                            variant={activeTab === "create-admin" ? "default" : "ghost"}
                            className="w-full justify-start gap-2 font-medium cursor-pointer"
                            onClick={() => setActiveTab("create-admin")}
                        >
                            <ShieldPlus size={18} />
                            Register Admin
                        </Button>
                    </div>
                </div>
                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="md:hidden p-4 border-b flex justify-between items-center">
                    <div className="text-xl font-bold">Admin Dashboard</div>
                    <div className="flex gap-2">
                        <Button
                            variant={activeTab === "users" ? "default" : "ghost"}
                            size="icon"
                            onClick={() => setActiveTab("users")}
                        >
                            <Users size={20} />
                        </Button>
                        <Button
                            variant={activeTab === "logs" ? "default" : "ghost"}
                            size="icon"
                            onClick={() => setActiveTab("logs")}
                        >
                            <ClipboardList size={20} />
                        </Button>
                        <Button
                            variant={activeTab === "create-admin" ? "default" : "ghost"}
                            size="icon"
                            onClick={() => setActiveTab("create-admin")}
                        >
                            <ShieldPlus size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                            <LogOut size={20} />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                    {activeTab === "users" && <UsersComponent />}
                    {activeTab === "logs" && <LogsComponent />}
                    {activeTab === "create-admin" && <CreateAdminComponent />}
                </div>
            </div>
            <Toaster />
        </div>
    )
}
