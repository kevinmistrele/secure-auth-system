"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Save, X } from "lucide-react"
import { userStore, type User } from "@/stores/user-store"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/providers/auth-provider.tsx"
import { toast } from "sonner"
import useApiService from "@/services/apiService.ts"
import { ConfirmationModal } from "@/components/modal/confirmation-modal.tsx"

export function ProfilePage() {
    const { user: authUser } = useAuth()
    const [user, setUser] = useState<User | null>(authUser ?? null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({ fullName: "" })
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null)
    const navigate = useNavigate()
    const { updateUser, deleteUser } = useApiService()

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedRole = localStorage.getItem("role")
        const storedEmail = localStorage.getItem("email")
        const storedFullName = localStorage.getItem("fullName")
        const storedUserId = localStorage.getItem("id")

        if (storedToken && storedRole && storedEmail && storedFullName && storedUserId) {
            const storedUser = {
                id: storedUserId,
                fullName: storedFullName,
                email: storedEmail,
                role: storedRole as "admin" | "user",
            }
            setUser(storedUser)
            userStore.setUser(storedUser)
        }
    }, [])

    if (!user) return null

    const handleEdit = () => {
        setFormData({ fullName: user.fullName })
        setIsEditing(true)
    }

    const handleCancel = () => setIsEditing(false)

    const handleSave = async () => {
        const updatedUser = { ...user, fullName: formData.fullName }
        userStore.setUser(updatedUser)
        setIsEditing(false)

        try {
            const response = await updateUser(user.id, formData.fullName)
            setUser(response.user)
            localStorage.setItem("fullName", response.user.fullName)
            toast.success("Profile updated successfully")
        } catch {
            toast.error("Error updating profile")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDelete = (userId: string) => {
        setUserIdToDelete(userId)
        setIsConfirmDeleteOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!userIdToDelete) return

        try {
            await deleteUser(userIdToDelete)
            toast.success("Account deleted successfully")
            logout()
        } catch {
            toast.error("Error deleting account")
        }
    }

    const logout = () => {
        userStore.clear()
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("id")
        navigate("/login")
    }

    return (
        <Card className="w-full max-w-md mx-auto my-8">
            <CardHeader>
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
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Role</p>
                            <p className="text-lg font-bold">{user.role}</p>
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
                    onClick={() => handleDelete(user.id)}
                >
                    Delete My Account
                </Button>
            </CardFooter>

            <ConfirmationModal
                isOpen={isConfirmDeleteOpen}
                onClose={() => setIsConfirmDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Are you sure?"
                description="Are you sure you want to delete this user? This action cannot be undone."
                confirmText="Yes, Delete"
                cancelText="Cancel"
                confirmVariant="destructive"
            />
        </Card>
    )
}
