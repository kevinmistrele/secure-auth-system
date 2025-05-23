import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiService from "@/services/apiService.ts";
import {userStore} from "@/stores/user-store.ts";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useApiService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(email, password);
      const normalizedRole = response.role.toLowerCase() === "admin" ? "admin" : "user";

      const userData = {
        id: response.id,
        fullName: response.fullName,
        email: response.email,
        role: normalizedRole as "user" | "admin",
      };

      localStorage.setItem("id", response.id);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", normalizedRole);
      localStorage.setItem("email", response.email);
      localStorage.setItem("fullName", response.fullName);

      login(userData, response.token);
      userStore.setUser(userData);

      navigate(normalizedRole === "admin" ? "/admin" : "/profile");
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
      <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="fabiano@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                  href="/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Logging in...
                </div>
            ) : (
                "Login"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
  );
}
