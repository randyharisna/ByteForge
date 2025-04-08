"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner"
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ok } from "assert";
import { GoAlert } from "react-icons/go";
import { callbackify } from "util";

const SignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        });
        if (res?.ok) {
            router.push("/");
            toast.success("login successful");
        }
        else if (res?.status === 401) {
            setError("Invalid credentials");
            setPending(false);
        }
        else {
            setError("Something went wrong");
        }
    };

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleProvider = (
        event: React.MouseEvent<HTMLButtonElement>,
        value: "github" | "google"
    ) => {
        event.preventDefault();
        signIn (value, {callbackUrl: "/"});
    };
    return (
        <div className="h-full flex items-center justify-center bg-[#1b0918]">
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
                <CardHeader>
                    <CardTitle className="text-center">
                        Sign In
                    </CardTitle>
                    <CardDescription className="text-sm text-center text-accent-foreground">
                        Use email or service to sign in
                    </CardDescription>
                    {!!error && (
                        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                            <GoAlert />
                            <p>{error}</p>
                        </div>)}
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                    <form onSubmit={handleSubmit} className="space-3">
                    <Input
                        type="email"
                        placeholder="Email"
                        disabled={pending}
                        value={email}  // Ensure this value is always consistent
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            disabled={pending}
                            value={password}  // Ensure this value is always consistent
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        <Button size="lg" disabled={pending} type="submit" className="w-full">
                            Sign In
                        </Button>
                        <Separator>
                            <div className="flex my-2 justify-evenly mx-auto items-center">
                                <Button
                                    disabled={false}
                                    onClick={() => { }}
                                    variant={"outline"}
                                    size={"lg"}
                                    className="bg-slate-300 hover:bg-slate-400 hover:scale-110">
                                    <FaGithub className="size-8 left-2.5 top-2.5" />
                                </Button>
                                <Button
                                    disabled={false}
                                    onClick={(e) => handleProvider(e, "google")}
                                    variant={"outline"}
                                    size={"lg"}
                                    className="bg-slate-300 hover:bg-slate-400 hover:scale-110">
                                    <FcGoogle className="size-8 left-2.5 top-2.5" />
                                </Button>
                            </div>
                        </Separator>
                    </form>
                    <p className="text-center text-sm mt-2 text-muted-foreground">
                        Create new account? <Link href="sign-up" className="text-sky-700 ml-4 hover:underline cursor-pointer">Sign Up</Link>
                    </p>
                </CardContent>
            </Card>
        </div>

    );
}

export default SignIn;