import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useApiService from "@/services/apiService.ts";
import {useNavigate} from "react-router-dom";

export function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { resetPassword } = useApiService();
    const navigate = useNavigate()

    const token = new URLSearchParams(window.location.search).get("token") || "";

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const success = await resetPassword(token, password);

            if (success) {
                toast.success("Password reset successfully!");
                navigate("/login");
            } else {
                toast.error("Invalid token or error resetting password.");
            }
        } catch {
            toast.error("An unexpected error occurred.");
        }
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Create new password</CardTitle>
                    <CardDescription>Enter a new password for your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-0 h-full px-3"
                                >
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Show password</span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Reset password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
