import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import useApiService from "@/services/apiService"

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
    const { registerUser } = useApiService()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            await registerUser({ name, email, password })
            navigate("/login")
        } catch {
            setError("Error registering user. Try a different email.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your information below to create your account
                </p>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
