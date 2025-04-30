"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/providers/auth-provider.tsx"
import { toast } from "sonner"
import useApiService from "@/services/apiService.ts";
import { userStore } from "@/stores/user-store.ts";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "@/components/modal/confirmation-modal.tsx";

export interface User {
    id: string
    name: string
    email: string
    role: "user" | "admin"
}

interface UsersComponentProps {
    users?: User[]
}

export function UsersComponent({ users = [] }: UsersComponentProps) {
    const { getUsers, deleteUser, updateUser } = useApiService()
    const [sampleUsers, setSampleUsers] = useState<User[]>(users)
    const [currentPage, setCurrentPage] = useState(1)
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null)
    const itemsPerPage = 12
    const totalPages = Math.ceil(sampleUsers.length / itemsPerPage)
    const currentUsers = sampleUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [newRole, setNewRole] = useState<"user" | "admin">("user")
    const [newName, setNewName] = useState("")
    const { user: loggedUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setIsLoading(true);
                const usersData = await getUsers();
                setSampleUsers(usersData);
            } catch (error) {
                console.error("Error loading users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleOpenEditModal = (user: User) => {
        setSelectedUser(user)
        setNewName(user.name)
        setNewRole(user.role)
        setIsModalOpen(true)
    }

    const logout = () => {
        userStore.clear()
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("id")
        navigate("/login")
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(userIdToDelete!)
            toast.success("User deleted successfully")
            setSampleUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete))

            if (userIdToDelete === loggedUser?.id) {
                logout()
            }

            setIsConfirmDeleteOpen(false)
        } catch (error) {
            toast.error("Error deleting user")
            console.error(error)
        }
    }

    const handleDelete = (userId: string) => {
        setUserIdToDelete(userId)
        setIsConfirmDeleteOpen(true)
    }

    const handleUpdateUser = async () => {
        if (!selectedUser) return

        try {
            const updatedUsers = sampleUsers.map((user) =>
                user.id === selectedUser.id
                    ? { ...user, name: newName, role: newRole }
                    : user
            )

            setSampleUsers(updatedUsers)

            await updateUser(selectedUser.id, newName, newRole)

            toast.success("User has been updated successfully!")
            setIsModalOpen(false)
            setSelectedUser(null)
        } catch {
            toast.error("Error updating user!")
        }
    }

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">User Management</h1>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                </div>
            ) : (
                <>
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="cursor-pointer"
                                                    onClick={() => handleOpenEditModal(user)}
                                                >
                                                    Edit User
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Delete User
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="md:hidden space-y-4">
                        {currentUsers.map((user) => (
                            <Card key={user.id}>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Name</p>
                                            <p className="font-medium">{user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p>{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Role</p>
                                            <p>{user.role}</p>
                                        </div>
                                        <div className="flex flex-col space-y-2 pt-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="cursor-pointer"
                                                onClick={() => handleOpenEditModal(user)}
                                            >
                                                Edit User
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                                onClick={() =>
                                                    user.id === loggedUser?.id
                                                        ? logout()
                                                        : handleDelete(user.id)
                                                }
                                            >
                                                {user.id === loggedUser?.id ? "Logout" : "Delete User"}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <div className="flex items-center space-x-2">
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        className="w-8 h-8 p-0 cursor-pointer"
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </>
            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Edit information for {selectedUser?.name}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <input
                                className="col-span-3 border rounded px-3 py-1 text-sm"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Role
                            </Label>
                            <Select value={newRole} onValueChange={(value) => setNewRole(value as "user" | "admin")}>
                                <SelectTrigger className="col-span-3 cursor-pointer">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className="cursor-pointer" value="user">User</SelectItem>
                                    <SelectItem className="cursor-pointer" value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button className="cursor-pointer" onClick={handleUpdateUser}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
        </>
    )
}
