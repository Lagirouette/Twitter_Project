import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import LoginButton from "@/components/_buttons/login";
import { LogoutButton } from "@/components/_buttons/logout";
import LoginBanner from "@/components/_banner/bannier";

export const metadata: Metadata = {
  title: "Twiitter App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const token = await cookieStore.get("token")
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {!token &&
          <div className="h-14 border-b border-solid border-gray-700">
            <LoginBanner/> 
          </div>
        }
        {children}
      </body>
    </html>
  );
}
