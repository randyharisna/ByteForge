'use server'

import { prisma } from "@/prisma";

export const resetPassword = async (email: string) => {
    console.log("Resseting password for " + email);
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
};