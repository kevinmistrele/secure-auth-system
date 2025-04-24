"use client"

import { useState } from "react"
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
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {useAuth} from "@/providers/auth-provider.tsx";
import {toast} from "sonner";


export interface User {
    id: string
    name: string
    email: string
    role: "User" | "Admin"
}

interface UsersComponentProps {
    users?: User[]
}

export function UsersComponent({ users = [] }: UsersComponentProps) {
    const [sampleUsers, setSampleUsers] = useState<User[]>(
        users.length
            ? users
            : [
                { id: "1", name: "John Doe", email: "john.doe@example.com", role: "User" },
                { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "Admin" },
                { id: "3", name: "Robert Johnson", email: "robert.j@example.com", role: "User" },
                { id: "4", name: "Emily Davis", email: "emily.davis@example.com", role: "User" },
                { id: "5", name: "Michael Brown", email: "michael.b@example.com", role: "User" },
                { id: "6", name: "Sarah Wilson", email: "sarah.w@example.com", role: "Admin" },
                { id: "7", name: "David Taylor", email: "david.t@example.com", role: "User" },
                { id: "8", name: "Lisa Anderson", email: "lisa.a@example.com", role: "User" },
                { id: "9", name: "John Doe", email: "john.doe@example.com", role: "User" },
                { id: "10", name: "Jane Smith", email: "jane.smith@example.com", role: "Admin" },
                { id: "11", name: "Robert Johnson", email: "robert.j@example.com", role: "User" },
                { id: "12", name: "Emily Davis", email: "emily.davis@example.com", role: "User" },
                { id: "13", name: "Michael Brown", email: "michael.b@example.com", role: "User" },
                { id: "14", name: "Sarah Wilson", email: "sarah.w@example.com", role: "Admin" },
                { id: "15", name: "David Taylor", email: "david.t@example.com", role: "User" },
                { id: "16", name: "Lisa Anderson", email: "lisa.a@example.com", role: "User" },
                { id: "17", name: "Sarah Wilson", email: "sarah.w@example.com", role: "Admin" },
                { id: "18", name: "David Taylor", email: "david.t@example.com", role: "User" },
                { id: "19", name: "Lisa Anderson", email: "lisa.a@example.com", role: "User" },
                { id: "20", name: "John Doe", email: "john.doe@example.com", role: "User" },
                { id: "21", name: "Jane Smith", email: "jane.smith@example.com", role: "Admin" },
                { id: "22", name: "Robert Johnson", email: "robert.j@example.com", role: "User" },
                { id: "23", name: "Emily Davis", email: "emily.davis@example.com", role: "User" },
                { id: "24", name: "Michael Brown", email: "michael.b@example.com", role: "User" },
                { id: "25", name: "Sarah Wilson", email: "sarah.w@example.com", role: "Admin" },
                { id: "26", name: "David Taylor", email: "david.t@example.com", role: "User" },
                { id: "27", name: "Lisa Anderson", email: "lisa.a@example.com", role: "User" },
            ],
    )

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const totalPages = Math.ceil(sampleUsers.length / itemsPerPage)
    const currentUsers = sampleUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [newRole, setNewRole] = useState<"User" | "Admin">("User")
    const [showAdminError, setShowAdminError] = useState(false)
    const [newName, setNewName] = useState("");
    const { user: loggedUser, updateProfile } = useAuth()



    const handleOpenChangeRoleModal = (user: User) => {
        if (user.role === "Admin") {
            setShowAdminError(true)
            setTimeout(() => setShowAdminError(false), 3000)
            return
        }

        setSelectedUser(user)
        setNewRole(user.role)
        setIsModalOpen(true)
    }

    const handleOpenEditModal = (user: User) => {
        setSelectedUser(user)
        setNewName(user.name)
        setNewRole(user.role)
        setIsModalOpen(true)
    }

    const handleUpdateUser = () => {
        if (!selectedUser) return;

        const updatedUsers = sampleUsers.map((user) =>
            user.id === selectedUser.id
                ? { ...user, name: newName, role: selectedUser.role === "Admin" ? "Admin" : newRole }
                : user
        );

        setSampleUsers(updatedUsers);

        if (selectedUser.email === loggedUser?.email) {
            updateProfile({ fullName: newName });
        }

        toast.success(`User has been updated successfully!`);
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">User Management</h1>
            </div>

            {showAdminError && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Admin roles cannot be changed</AlertDescription>
                </Alert>
            )}

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
                                        onClick={() => handleOpenChangeRoleModal(user)}
                                    >
                                        Change Role
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                    >
                                        Delete User
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
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <input
                                className="col-span-3 border rounded px-3 py-1 text-sm"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>

                        {!selectedUser?.role.includes("Admin") && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">Role</Label>
                                <Select value={newRole} onValueChange={(value) => setNewRole(value as "User" | "Admin")}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdateUser}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
