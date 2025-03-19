"use client"

import Sidebar from "@/components/_sidebar/Sidebar";
import { Suspense, useEffect, useState } from "react";
import LeftSideBar from "@/components/_lsidebar/lsidebar";
import BackButton from "@/components/_buttons/backButton";
import Link from "next/link";
import { GetNumberFollowings, GetNumberOfFollowers, GetUser, GetUserPosts } from "@/api/ApiCalls";
import EngagingBarPost from "@/components/_EngagingBar/EngagementBar";
import FollowButton from "@/components/_buttons/followButton";
import { formatDate } from "@/function/DateFormat";
import { Post, User } from "@/api/Types";

export default function ProfilePage({
    params,
}: {
    params: Promise<{id:string}>
}) {

    const [ID, setID] = useState<string>("");
    const [post, setPosts] = useState<Post[]>();
    const [user, setUser] = useState<User>();
    const [nbfollowers, setFollowers] = useState<number>()
    const [nbsfollowings, setFollowings] = useState<number>()
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            const {id} = await params
            setID(id)
            const postData = await GetUserPosts(id)
            const userData = await GetUser(id)

            const followers = await GetNumberOfFollowers(userData.id)
            const followings = await GetNumberFollowings(userData.id)

            setPosts(postData)
            setUser(userData)
            setFollowers(followers)
            setFollowings(followings)
            setLoading(false);
        }

        fetchData();
    }, []);


    
    return (
        <div className="grid grid-cols-10">
            
            <div className="col-span-2 pl-10 pt-2 text-xl font-bold flex-none">
                <Sidebar/>
            </div>
            
            <div className="col-span-5 grid-cols-2 flex-none">
                <div className="flex shadow-md p-3 border border-solid border-gray-800">
                    <BackButton/>
                    <div className="">
                        {ID}
                        <p className="text-sm text-gray-500">242 Tweets</p>
                    </div>
                </div>
                <div className="shadow-md border-x border-solid border-gray-800 h-72">
                    <div className="h-4/5 bg-sky-500"></div>
                    <div className="flex justify-end pt-2">
                        <a className='hover:text-sky-500 pt-1 px-3' href="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </a> 
                        <FollowButton name={ID} />
                    </div>
                </div>
                <div className="shadow-md p-3 border-b border-x border-solid border-gray-800">
                    <h1 className="font-bold text-xl">{ID}</h1>
                    <p className="text-gray-500">{user?.pseudo}</p>
                    <p className="mt-2">{user?.profil}</p>
                    <div className="flex mt-4">
                    <p className="">{nbsfollowings} Followings</p>
                    <p className="ml-4">{nbfollowers} Followers</p>
                    </div>
                </div>
                {post && 
                    post.map((post) => (
                        <div key={post.id} className="flex shadow-md p-4 border border-solid border-gray-700">
                            <div className="px-2">
                                <svg xmlns="www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none">
                                    <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <div className="w-full">
                                <Link href={"http://localhost:3000//profilePage/"+ post.createdBy}>
                                    <Suspense
                                    fallback={
                                        <div className="text-sm text-white">Loading author...</div>
                                    }
                                    >
                                    <p ><span className="text-xl">{post.createdBy} </span><span className="text-sm text-gray-500"> {post.createdByPseudo} ⸱ {formatDate(post.creatOn)}</span></p>
                                  
                                    </Suspense>
                                    <p className="text-white mb-4 leading-relaxed">{post.body}</p>
                                </Link>
                                <EngagingBarPost postId={post.id}/>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="col-span-3 grid-cols-1 mx-5 pt-2">
                <LeftSideBar/>
            </div>
        </div>
    );
}