import { getVerificationTokenByEmail } from '@/data/verification-token';
import { prisma } from '@/prisma';
import {v4 as uuidv4} from 'uuid';

export const generateVerificationToken = async (email: string) => {
    // Generate a random token
    const token = uuidv4();
    const expire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration time

    // Checl if the token already exists in the database
    const existingToken = await getVerificationTokenByEmail(email);
    
    if(existingToken){
        await prisma.verificationToken.delete({
            where: { id: existingToken.id },
        });
    }

    // Create a new verification token
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires: new Date(expire),
        },
    });

    return verificationToken;
}   
