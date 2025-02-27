"use server"
import { cookies } from "next/headers"

export async function DeletingCookie() {
    
        const cookieStore = await cookies()
        cookieStore.delete("token")
    
}