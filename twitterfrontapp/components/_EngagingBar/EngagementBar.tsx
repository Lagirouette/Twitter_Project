"use client"

import { DeleteLike, GetIfLiked, GetLike, PostLike } from "@/api/ApiCalls";
import { RecupTokenBool } from "@/Token/RecupToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EngagingBarPost({postId}:{postId:number}) {
    
    const[dataLike, setData] = useState(0)
    const[dataComment, setDataComment] = useState(0)
    const[like, setLike] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetch(`https://localhost:44301/api/like/${postId}`)
            .then((response) => response.json())
            .then((json) => setData(json));
        
        fetch(`https://localhost:44301/api/comment/nb/${postId}`)
            .then((response) => response.json())
            .then((json) => setDataComment(json));

        const getLikestatusInit = async () => {
            const verifToken = await RecupTokenBool()
            if (verifToken){
                const result = await GetIfLiked(postId)
                if(!result){
                    setLike(true)
                }
            }
        }
        getLikestatusInit();
    },[])

    const Click = async () => {
        const verifToken = await RecupTokenBool()
        if (verifToken){
            const verif = await GetIfLiked(postId)

            if (!verif){
                await router.refresh()
                await DeleteLike(postId)
                setLike(false)
                setData(dataLike-1)
                
            }else{
                await PostLike(postId)
                setLike(true)
                setData(dataLike+1)
                await router.refresh()
            }
        }else{
            await router.push("/login")
        }
        }

    return (
        <div className="flex justify-between pr-20 text-gray-500">
            <div className="flex">
                <button onClick={() => {router.push("/tweet/"+postId)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 hover:fill-white active:text-gray-900">
                        <path strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                </button>
                <p className="pl-1 pb-1">{dataComment}</p>
            </div>
            <svg className="mt-1 size-5 hover:text-green-500 active:text-green-900"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />  
                <polyline points="7 23 3 19 7 15" />  
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            
            {!like ? (
                <div className="flex">
                    <button onClick={async () => {Click()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 hover:fill-pink-500 hover:border-pink-500 hover:text-pink-500 active:text-white active:fill-white ">
                            <path strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                    <p className="pl-1 pb-1">{dataLike}</p>
                </div>
                ) : (
                    <div className="flex">
                        <button onClick={async () => {Click()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-pink-600 fill-pink-600 hover:fill-pink-800 hover:border-pink-800 hover:text-pink-800 active:text-pink-950">
                                <path strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                        <p className="pl-1 pb-1">{dataLike}</p>
                    </div>
                )
            }
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="mt-1 size-5 hover:text-blue-700 active:text-blue-900">
                <path strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
        </div>
    );
}