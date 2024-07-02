import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/reduxProvider/ReduxProvider";
import { AuthProvider } from "@/context/authProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description:
    "Todo App with NextJS, Redux Toolkit, Next Auth, MongoDB, Prisma ORM and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <div className="bg-dotted-pattern bg-dotted-size h-screen">
            {children}
            </div>
            </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
