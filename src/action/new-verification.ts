"use server"
import { prisma } from "@/prisma";
import { getUserByEmail } from "@/models/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token" };  // Return error here
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired" };  // Return error here
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "User not found" };  // Return error here
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: { 
            emailVerified: new Date(),
            email: existingToken.email,
         },
    });

    await prisma.verificationToken.delete({
        where: { id: existingToken.id },
    });

    return { success: "Email verified successfully" };  // Return success here
};
