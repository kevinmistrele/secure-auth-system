import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "@/services/user-service";
import { toast } from "sonner";

export function ForgotPasswordPage() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        const success = await requestPasswordReset(email);

        if (success) {
            toast.success("Link de redefinição enviado para seu e-mail!");
        } else {
            toast.error("E-mail não encontrado.");
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
            <div className="mx-auto w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter the email address associated with your account and we'll send you a link to reset your
                        password.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="email" className="sr-only">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="fabiano@example.com"
                        />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer">
                        Reset password
                    </Button>
                </form>
                <div className="flex justify-center">
                    <Link to="/login" className="underline underline-offset-4">
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
