import { prisma } from "@/prisma";

export const getUserByEmail = async (email: string) => {
    try {
        const lowerCaseEmail = email.toLowerCase();
        const user = await prisma.user.findUnique({
            where: { email: lowerCaseEmail },
        });

        return user;
    } catch (error) {
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        return user;
    } catch (error) {
        return null;
    }
}