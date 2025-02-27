"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Register", href: "/register"},
    { name: "Login", href: "/login"},
    { name: "Forgot Password", href: "/forgot-password"}
]

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const pathname = usePathname();

    return (
      <html lang="en">
        <body className="bg-black text-white">
            <div className="bg-gray-900 text-white">
                {navLinks.map((link) => {

                    const isActive =  pathname == link.href || (pathname.startsWith(link.href) && link.href !== "/")

                    return (
                        <Link 
                            className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}
                            href={link.href}
                            key={link.name}
                        >
                            {link.name}
                        </Link>
                    )
                })}
            </div>
          {children}
        </body>
      </html>
    );
  }