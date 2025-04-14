import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export function RegisterForm({
                                 className,
                                 ...props
                             }: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your information below to create your account
                </p>
            </div>

            <div className="grid gap-6">
                {/* Nome */}
                <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="Fabiano Silva" required />
                </div>

                {/* Email */}
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="fabiano@example.com" required />
                </div>

                {/* Senha */}
                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>

                {/* Confirmar senha (opcional, mas bom ter) */}
                <div className="grid gap-3">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                    Sign Up
                </Button>
            </div>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                    Login
                </Link>
            </div>
        </form>
    )
}
