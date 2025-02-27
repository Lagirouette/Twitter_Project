import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode"; 

export async function RecupToken(){
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")

    const S_token = JSON.stringify(token)

    const decoded = jwtDecode(S_token);

    return decoded
}