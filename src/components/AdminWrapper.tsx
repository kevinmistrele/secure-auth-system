import {AdminPage, User} from "@/pages/AdminPage";

export function AdminWrapper() {
    const sampleUsers: User[] = [
        { id: "1", name: "John Doe", email: "john.doe@example.com", role: "User" },
        { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "Admin" },
        { id: "3", name: "Robert Johnson", email: "robert.j@example.com", role: "User" },
        { id: "4", name: "Emily Davis", email: "emily.davis@example.com", role: "User" },
        { id: "5", name: "Michael Brown", email: "michael.b@example.com", role: "User" },
        { id: "6", name: "Sarah Wilson", email: "sarah.w@example.com", role: "Admin" },
        { id: "7", name: "David Taylor", email: "david.t@example.com", role: "User" },
        { id: "8", name: "Lisa Anderson", email: "lisa.a@example.com", role: "User" },
    ];
    return (
        <AdminPage users={sampleUsers} />
    );
}
