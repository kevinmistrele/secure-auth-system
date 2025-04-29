"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useApiService from "@/services/apiService"  // 👈 importa seu useApiService!

export interface Log {
    id: string
    action: string
    user: string
    timestamp: string
    details: string
}

export function LogsComponent() {
    const { getLogs } = useApiService(); // 👈 pega o getLogs do seu serviço
    const [logs, setLogs] = useState<Log[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;
    const totalPages = Math.ceil(logs.length / itemsPerPage);
    const currentLogs = logs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const logsData = await getLogs();
                setLogs(logsData);
            } catch (error) {
                console.error('Erro ao buscar logs:', error);
            }
        }

        fetchLogs();
    }, []);

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
                                <TableCell className="py-4">{log.action}</TableCell>
                                <TableCell className="py-4">{log.user}</TableCell>
                                <TableCell className="py-4">{new Date(log.timestamp).toLocaleString()}</TableCell>
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
                                    <p>{new Date(log.timestamp).toLocaleString()}</p>
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
