"use client"

import { GetIfFollow } from "@/api/ApiCalls";
import { RecupTokenBool } from "@/Token/RecupToken";
import { RecupUserInfos } from "@/Token/RecupUserName";
import { useEffect, useState } from "react";


export default async function FollowButton({name}:{name:string}) {

    const [token, setToken] = useState<boolean>();
    const [userName, setUserName] = useState<string>();
    const [follow, setFollow] = useState<boolean>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
        const token = await RecupTokenBool();
        setToken(token);

        if (token) {
            const userInfos = await RecupUserInfos();
            setUserName(userInfos);

            if (userInfos !== name) {
            const followStatus = await GetIfFollow(name);
            setFollow(followStatus);
            }
        }

        setLoading(false);
        }

        fetchData();
    }, [name]);

    if (loading) {
        return <div>Loading...</div>; // Afficher un indicateur de chargement
    }


    if (token){
        const userName = await RecupUserInfos()
        
        if(userName === name){
            return(<button className=' bg-sky-500 hover:bg-sky-800 rounded-full py-2 px-3 mr-2 font-bold'>Edit</button>) 
        }else{
            const follow = await GetIfFollow(name)

            if (follow){
                return (<button className=' bg-red-500 hover:bg-red-800 rounded-full py-2 px-3 mr-2 font-bold'>Unfollow</button>) 
            }else{
                return (<button className=' bg-sky-500 hover:bg-sky-800 rounded-full py-2 px-3 mr-2 font-bold'>Follow</button>)
            }
        }

    }else{
        return (
            <a href="/login"><button className=' bg-sky-500 hover:bg-sky-800 rounded-full py-2 px-3 mr-2 font-bold'>Follow</button></a>
        )
    }
}