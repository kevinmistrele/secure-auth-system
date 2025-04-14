import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {LogOut, Users} from "lucide-react";
import {Card, CardContent } from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

export interface User {
    id: string
    name: string
    email: string
    role: "User" | "Admin"
}

interface AdminDashboardProps {
    users: User[]
}

export function AdminPage({ users = [] }: AdminDashboardProps) {
    const sampleUsers: User[] = users.length ? users : [
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
    ];

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const totalPages = Math.ceil(sampleUsers.length / itemsPerPage)

    const indexOfLastUser = currentPage * itemsPerPage
    const indexOfFirstUser = indexOfLastUser - itemsPerPage
    const currentUsers = sampleUsers.slice(indexOfFirstUser, indexOfLastUser)

    return (
        <div className="flex min-h-screen bg-background">
            <div className="hidden md:flex flex-col w-64 border-r bg-gray-100">
                <div className="p-4 text-xl font-bold border-b">Admin Dashboard</div>
                <div className="flex-1 py-4">
                    <div className="px-4 py-2">
                        <Button className="w-full justify-start gap-2 font-medium cursor-pointer">
                            <Users size={18}/>
                            Users
                        </Button>
                    </div>
                </div>
                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                        <LogOut size={18}/>
                        Logout
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
            <div className="md:hidden p-4 border-b flex justify-between items-center">
                    <div className="text-xl font-bold">Admin Dashboard</div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                            <Users size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                            <LogOut size={20} />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">User Management</h1>
                    </div>

                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-center" >Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center items-center space-x-2">
                                                <Button size="sm" variant="outline" className="cursor-pointer">
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
                                            <Button size="sm" variant="outline" className="cursor-pointer">
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
                </div>
            </div>
        </div>
    )
}