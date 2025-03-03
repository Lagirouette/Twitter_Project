import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode"; 

type User = {
    email : string,
    given_name : string
}

export async function RecupUserInfos(){
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")

    const S_token = JSON.stringify(token)

    const decoded = jwtDecode(S_token);
    
    // const J_token = JSON.stringify(decoded)

    return decoded.given_name
}

export async function RecupPseudo(){
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")

    const S_token = JSON.stringify(token)

    const decoded = jwtDecode(S_token);
    
    // const J_token = JSON.stringify(decoded)

    return decoded.unique_name
}