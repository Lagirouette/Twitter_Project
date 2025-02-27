"use server"

import { cookies } from 'next/headers'


export async function TokenCookie(token:any) {
    
    const cookieStore = await cookies()

    await cookieStore.set("token", token)
    
}