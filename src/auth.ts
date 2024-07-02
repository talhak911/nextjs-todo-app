import type { NextAuthConfig } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../prisma/client";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
import { PrismaAdapter } from "@auth/prisma-adapter";

const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: {
            label: "Email",
            type: "text"
        },
        password: {
            label: "Password",
            type: "password"
        }
    },
    
    async authorize(credentials,) {
      try {
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password are required");
        }
        
        const user = await prisma.user.findFirst({ where: { email: credentials.email } });
        if (!user) {
            throw new Error("Invalid Email or Password!");
        }
        if (user.provider === 'google'){
            throw new Error("this account is associated with Google please login with Google");
        }
        const validPassword = await bcryptjs.compare(credentials.password as string, user.password);
        if (!validPassword) {
            throw new Error("Invalid Email or Password!");
        }

        if (!user.isVerified) {
            await sendEmail({ email: user.email, emailType: 'VERIFY', userId: user.id });
            throw new Error("Verify your account. Email has been sent to you.");
        }

        return user;
      } catch (error) {
        return null
      }
    }
});

const config: NextAuthConfig = {
    // adapter:PrismaAdapter(prisma),
    providers: [
        Google,
        credentialsConfig
    ],
    pages:{
        signIn:"/sign-in"
    },
    events:{
       async signIn({user,account}){
            try {
                if (!user.email) {
                    throw new Error("Email is required");
                }
                if (account?.provider === "google"){
                const existingUser = await prisma.user.findFirst({ where: { email: user.email } });
                if (!existingUser) {
                   await prisma.user.create({
                    data:{
                        email:user.email,
                        name:user.name,
                        password:await bcryptjs.hash("sfdljf",11),
                        isVerified:true,
                        provider:"google"
                    }
                   })
                }
            }
                
        
                
              } catch (error) {
            
              }
        }
    }
  
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
