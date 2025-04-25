"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useApiService from "@/services/apiService.ts";
import {useNavigate} from "react-router-dom";

const formSchema = z
    .object({
        name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
        email: z.string().email({ message: "Email inválido" }),
        password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    })

type FormValues = z.infer<typeof formSchema>

export function CreateAdminComponent() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { registerAdmin } = useApiService()
    const navigate = useNavigate()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)

        try {
            await registerAdmin({
                name: values.name,
                email: values.email,
                password: values.password,
            })

            toast.success("Admin created successfully!", {
                description: `${values.name} has been granted admin access.`,
            })

            form.reset()

            // Redirecionar pro login se quiser
            navigate("/login")
        } catch (error) {
            toast.error("Failed to create admin", {
                description: "An error occurred. Please try again.",
            })
            console.error("Erro ao criar admin:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-full min-h-[calc(100vh-64px)] px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Register new administrator</CardTitle>
                    <CardDescription>Add a new user with admin privileges to the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insert your full name..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="admin@example.com" {...field} />
                                        </FormControl>
                                        <FormDescription>This email will be used to login.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormDescription>Password must be at least 8 characters.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full mt-6 cursor-pointer" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                        Register admin
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    Administrators will have full access to the user and logs panel.
                </CardFooter>
            </Card>
        </div>
    )
}
