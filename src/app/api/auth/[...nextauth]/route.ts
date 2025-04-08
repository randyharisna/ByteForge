import NextAuth from "next-auth";
// import User from "@/models/user";
// import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import connectToDatabase, { prisma } from "@/prisma";
import { getUserById } from "@/models/user";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email,
                        },
                    });
                    if (!user) {
                        throw new Error("No user found");
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    );
                    if (!isValidPassword) {
                        throw new Error("Incorrect password");
                    }
                    return user;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        }),
    ],
    callbacks: {
async signIn({ user, account }) {
        if (account?.provider !== "credentials") {
            return true; 
        }

        const existingUser = await getUserById(user.id ?? "");
        if (!existingUser?.emailVerified) {
            return false; 
        }

        return true; 


    },

        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id; 
                token.email = user.email;
                token.name = user.name || ""; 
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture || "", 
                };
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };