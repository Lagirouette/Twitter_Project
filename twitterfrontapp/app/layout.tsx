import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import LoginBanner from "@/components/_banner/bannier";
import StoreProvider from "@/store/StoreProvider";

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
    <StoreProvider>
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
    </StoreProvider>
  );
}
