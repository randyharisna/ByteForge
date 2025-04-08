import { EmailTemplateVerification } from '@/components/email/email-verification';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/verify-email?token=${token}`
    const sendVerification = await EmailTemplateVerification({ confirmationLink });
    
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        react: sendVerification,
    });
};