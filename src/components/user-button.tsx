import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserButton = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Loader className="w-6 h-6 mr-4 float-right animate-spin" />
        );
    }

    const avatarFallbackText = session?.user?.name?.charAt(0).toUpperCase();

    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push("/");
    };

    return (
        <div>
            <nav>
                {session ? (
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
                            <div className="flex gap-4 items-center">
                                <span>{session.user?.name}</span>
                                <Avatar className="w-10 h-10 hover:opacity-75 transition">
                                    <AvatarImage
                                        className="w-10 h-10 hover:opacity-75 transition"
                                        src={session.user?.image || undefined}
                                    />
                                    <AvatarFallback className="bg-sky-900 text-white">
                                        {avatarFallbackText}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" side="bottom" className="w-50">
                            <DropdownMenuItem className="h-10" onClick={() => handleSignOut()}>
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex justify-end p-4 gap-4">
                        <Button>
                            <Link href="sign-in">Sign In</Link>
                        </Button>
                        <Button>
                            <Link href="sign-up">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default UserButton;