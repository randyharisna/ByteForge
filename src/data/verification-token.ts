import {prisma} from "@/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { email: email },
        });
    
        return verificationToken;
    }catch (error) {
        console.error("Error fetching verification token:", error);
        throw new Error("Could not fetch verification token");
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { token: token },
        });
    
        return verificationToken;
    }catch (error) {
        console.error("Error fetching verification token:", error);
        throw new Error("Could not fetch verification token");
    }
}