import type { NextAuthConfig } from "next-auth";
import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import  prisma  from "../prisma/client";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
import { PrismaAdapter } from "@auth/prisma-adapter";

const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
    
        email: {
            label: "Email",
            type: "email"
        },
        password: {
            label: "Password",
            type: "password"
        },
        
    },
    async authorize(credentials) {
      
        let user = null
        // if (!credentials?.email || !credentials?.password) {
        //     throw new CredentialsSignin("Email and Password are required");
        // }
        
        // user = await prisma.user.findFirst({ where: { email: credentials.email } });
        // if (!user) {
        //     throw new CredentialsSignin("Invalid Email or Password!");
        // }
       
        // const validPassword = await bcryptjs.compare(credentials.password as string, user.hashedPassword as string);
        // if (!validPassword) {
        //     throw new CredentialsSignin("Invalid Email or Password!");
        // }

        // if (!user.isVerified) {
        //     await sendEmail({ email: user.email, emailType: 'VERIFY', userId: user.id });
        //     throw new Error("Verify your account. Email has been sent to you.");
        // }

        return user;
    
    }
});

const config: NextAuthConfig = {
    callbacks:{
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
        
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url
        
            return baseUrl
          },
        async signIn({user}){
            if(!user){
                return false
            }
return true
        }
    },
    adapter:PrismaAdapter(prisma),
    session:{strategy:"jwt"},
    providers: [
        Google,
        credentialsConfig
    ],
    pages:{
        signIn:"/sign-in",
        // error: '/auth/error'
    },
    secret:process.env.AUTH_SECRET,
    events:{
    
    //    async signIn({user,account}){
    //         try {
    //             if (!user.email) {
    //                 throw new Error("Email is required");
    //             }
    //             if (account?.provider === "google"){
    //             const existingUser = await prisma.user.findFirst({ where: { email: user.email } });
    //             if (!existingUser) {
    //                await prisma.user.create({
    //                 data:{
    //                     email:user.email,
    //                     name:user.name,
    //                     password:await bcryptjs.hash("sfdljf",11),
    //                     isVerified:true,
    //                     provider:"google"
    //                 }
    //                })
    //             }
    //         }
                
        
                
    //           } catch (error) {
            
    //           }
    //    }
    }
  
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
