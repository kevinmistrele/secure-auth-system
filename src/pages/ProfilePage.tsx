"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Save, X } from "lucide-react"
import { userStore, User } from "@/stores/user-store"
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/providers/auth-provider.tsx"; // 👈 import do store

export function ProfilePage() {
    const { user: authUser } = useAuth(); // pega o user do AuthProvider também
    const [user, setUser] = useState<User | null>(authUser ?? null) // inicia com authUser
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({ fullName: "" })
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedRole = localStorage.getItem("role")
        const storedEmail = localStorage.getItem("email")
        const storedFullName = localStorage.getItem("fullName")

        if (storedToken && storedRole && storedEmail && storedFullName) {
            const storedUser = {
                fullName: storedFullName,
                email: storedEmail,
                role: storedRole as "admin" | "user"
            }
            setUser(storedUser)
            userStore.setUser(storedUser) // 👈 isso que tava faltando!
        }
    }, [])

    if (!user) return null

    const handleEdit = () => {
        setFormData({ fullName: user.fullName })
        setIsEditing(true)
    }

    const handleCancel = () => setIsEditing(false)

    const handleSave = () => {
        const updatedUser = { ...user, fullName: formData.fullName }
        userStore.setUser(updatedUser)
        setIsEditing(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const logout = () => {
        userStore.clear()
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/login")
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] w-full">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {isEditing ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Email Address</p>
                                <p className="text-lg font-bold">{user.email}</p>
                                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Role</p>
                                <p className="text-lg font-bold">{user.role}</p>
                                <p className="text-xs text-muted-foreground mt-1">Role cannot be changed by the user</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Full Name</p>
                                <p className="text-lg font-bold">{user.fullName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Email Address</p>
                                <p className="text-lg font-bold">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Role</p>
                                <p className="text-lg font-bold">{user.role}</p>
                            </div>
                        </>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4 justify-center pt-2 pb-6">
                    {isEditing ? (
                        <div className="flex gap-2 w-full">
                            <Button
                                variant="outline"
                                className="flex-1 border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                                onClick={handleCancel}
                            >
                                <X size={16} className="mr-2" />
                                Cancel
                            </Button>
                            <Button className="flex-1" onClick={handleSave}>
                                <Save size={16} className="mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full mb-4 border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                            onClick={handleEdit}
                        >
                            <Pencil size={16} className="mr-2" />
                            Edit Profile
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        onClick={logout}
                    >
                        Delete My Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
