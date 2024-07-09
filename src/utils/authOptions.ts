import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  prisma  from "../../prisma/client";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export const authOptions:AuthOptions ={
    // adapter:PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt"
    },
    callbacks:{

          async redirect({ baseUrl }) {
            return baseUrl
          },
          async session({ session }) {
            return session
          },
          async jwt({ token }) {
            return token
          }
    },
    debug: process.env.NODE_ENV !== "production",
    pages:{
        signIn:"/sign-in"
    },
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        },
    ),
        Credentials({
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
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and Password are required");
                }
                
                user = await prisma.user.findFirst({ where: { email: credentials.email } });
                if (!user) {
                    throw new Error("Invalid Email or Password!");
                }
               
                const validPassword = await bcryptjs.compare(credentials.password as string, user.hashedPassword as string);
                if (!validPassword) {
                    throw new Error("Invalid Email or Password!");
                }
        
                if (!user.isVerified) {
                    await sendEmail({ email: user.email, emailType: 'VERIFY', userId: user.id });
                    throw new Error("Verify your account. Email has been sent to you.");
                }
        
                return user;
            
            },
           
        
        }),
        
    ],
events :{
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
                     hashedPassword:await bcryptjs.hash("sfdljf",11),
                     isVerified:true,
                     provider:"google"
                 }
                })
             }
         }
             
     
             
           } catch (error) {
         
           }
     
}},
    
  
   
}
