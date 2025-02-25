"use client"

import { useRouter } from "next/router"
import { SyntheticEvent, useState } from "react"


export async function Signup() {
    
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    
    const router = useRouter()

    const submit = async () => {

        await fetch("http://localhost:5130/api/account/login", {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                password
            })
        })
    }
    console.log(name, password)
    await submit()
}