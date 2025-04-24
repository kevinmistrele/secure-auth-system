"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface Log {
    id: string
    action: string
    user: string
    timestamp: string
    details: string
}

interface LogsComponentProps {
    logs?: Log[]
}

export function LogsComponent({ logs = [] }: LogsComponentProps) {
    const sampleLogs: Log[] = logs.length
        ? logs
        : [
            {
                id: "1",
                action: "Login",
                user: "John Doe",
                timestamp: "2023-07-15 08:30:45",
                details: "Successful login from 192.168.1.1",
            },
            {
                id: "2",
                action: "Update Profile",
                user: "Jane Smith",
                timestamp: "2023-07-15 09:15:22",
                details: "Changed email address",
            },
            {
                id: "3",
                action: "Delete User",
                user: "Admin",
                timestamp: "2023-07-15 10:05:11",
                details: "Deleted user Robert Johnson",
            },
            {
                id: "4",
                action: "Failed Login",
                user: "Unknown",
                timestamp: "2023-07-15 10:45:30",
                details: "Failed login attempt from 203.0.113.1",
            },
            {
                id: "5",
                action: "Create User",
                user: "Admin",
                timestamp: "2023-07-15 11:20:18",
                details: "Created new user Emily Davis",
            },
            {
                id: "6",
                action: "Password Reset",
                user: "Michael Brown",
                timestamp: "2023-07-15 12:10:05",
                details: "Requested password reset",
            },
            {
                id: "7",
                action: "Role Change",
                user: "Admin",
                timestamp: "2023-07-15 13:25:40",
                details: "Changed Sarah Wilson role to Admin",
            },
            {
                id: "8",
                action: "Logout",
                user: "David Taylor",
                timestamp: "2023-07-15 14:15:22",
                details: "User logged out",
            },
            {
                id: "9",
                action: "Login",
                user: "Lisa Anderson",
                timestamp: "2023-07-15 15:05:33",
                details: "Successful login from 192.168.1.5",
            },
            {
                id: "10",
                action: "API Access",
                user: "System",
                timestamp: "2023-07-15 16:30:10",
                details: "API key generated for integration",
            },
            {
                id: "11",
                action: "Settings Update",
                user: "Admin",
                timestamp: "2023-07-15 17:20:45",
                details: "Updated system settings",
            },
            {
                id: "12",
                action: "Backup",
                user: "System",
                timestamp: "2023-07-15 18:00:00",
                details: "Automatic backup completed",
            },
        ]

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const totalPages = Math.ceil(sampleLogs.length / itemsPerPage)
    const currentLogs = sampleLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">System Logs</h1>
            </div>

            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell  className="py-4">{log.action}</TableCell>
                                <TableCell className="py-4">{log.user}</TableCell>
                                <TableCell className="py-4">{log.timestamp}</TableCell>
                                <TableCell className="py-4">{log.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="md:hidden space-y-4">
                {currentLogs.map((log) => (
                    <Card key={log.id}>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Action</p>
                                    <p className="font-medium">{log.action}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">User</p>
                                    <p>{log.user}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Timestamp</p>
                                    <p>{log.timestamp}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Details</p>
                                    <p>{log.details}</p>
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
    )
}
