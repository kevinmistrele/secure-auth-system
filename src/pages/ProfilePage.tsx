import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfilePage() {
    const { user, deleteAccount } = useAuth();

    if (!user) return null;

    return (
        <div className="flex justify-center items-center min-h-[80vh] w-full">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
                <CardFooter className="flex flex-col gap-4 justify-center pt-2 pb-6">
                    <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                        onClick={deleteAccount}
                    >
                        Delete My Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
