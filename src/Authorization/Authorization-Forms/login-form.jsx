"use client";

import CardWrapper from "./card-wrapper";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/Schema/index";
import { useForm } from "react-hook-form";
import { Input } from "../UI-Components/input";
import { Button } from "../UI-Components/button";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import {yupResolver} from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ToastContext"


export function LoginPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const form = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch('https://four155-project-pyflask.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log(responseData);
    
            // Save login state
            localStorage.setItem("isLoggedIn", "true");
    
            // Save user object to localStorage if available
            if (responseData.user) {
                console.log("Logged in user:", responseData.user);  // Check for _id here
                localStorage.setItem("user", JSON.stringify(responseData.user));
            }
            
            // Show success message and navigate to profile
            showToast("Login successful!", "success");
            navigate("/profile");
            
    
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    
    
    

    const { pending } = useFormStatus();
    return (
        <CardWrapper
            label="Login to your account"
            title="Login"
            backButtonHref="/"
            backButtonLabel="Don't have an account? Register here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="johndoe@gmail.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="******" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={pending}>
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

