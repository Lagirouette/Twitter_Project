"use server"
import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode"; 
import { JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    unique_name: string;
    email: string;
    given_name: string; // Add other custom claims if needed
}

export async function RecupUserInfos(){
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")

    const S_token : string = JSON.stringify(token)

    const decoded = jwtDecode<CustomJwtPayload>(S_token);
    
    // const J_token = JSON.stringify(decoded)

    return decoded.given_name
}

export async function RecupPseudo(){
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")

    const Stoken : string = JSON.stringify(token)

    const decoded = jwtDecode<CustomJwtPayload>(Stoken);
    
    // const J_token = JSON.stringify(decoded)

    return decoded.unique_name
}

export async function RecupEmail(){
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")

    const Stoken : string = JSON.stringify(token)

    const decoded = jwtDecode<CustomJwtPayload>(Stoken);
    
    // const J_token = JSON.stringify(decoded)

    return decoded.email
}