import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    if (!credentials?.username || !credentials.password) {
                        throw new Error("Username and password are required");
                    }

                    const user: any = await UserModel.findOne({
                        $or: [
                            { username: credentials.username },
                            { email: credentials.username },
                        ],
                    });

                    if (!user) {
                        throw new Error("No user found");
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account first");
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    } else {
                        throw new Error("An unknown error occurred during authentication");
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token
        },
        async session({ session, token}) {
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};
