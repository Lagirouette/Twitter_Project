import { Suspense } from "react";
import Sidebar from "@/components/_sidebar/Sidebar";
import PostTextArea from "@/components/_post/PostTextArea";
import EngagingBar from "@/components/_EngagingBar/page";
import LeftSideBar from "@/components/_lsidebar/lsidebar";



type Post = {
    createdBy: string;
    createOn: Date;
    title: string;
    body: string;
}

export default async function PostFeed() {
    const response = await fetch("http://localhost:5130/api/post")
    const posts: Post[] = await response.json()
    console.log(posts)

    return (
        <div className="bg-black grid grid-cols-10 flex">
            
            <div className="col-span-2 pl-10 pt-2 text-xl font-bold flex-none">
                <Sidebar/>
            </div>
            
            <div className="col-span-5 grid-cols-2 flex-none">
                <div className="shadow-md p-3 border border-solid border-gray-700">
                    <h1 className="font-bold text-xl">Home</h1>
                </div>
                <div className="shadow-md p-5 border border-b-8 border-solid border-gray-700">
                    <PostTextArea/>
                </div>
                {posts.map((post) => (
                    <div className="flex shadow-md p-4 border border-solid border-gray-700">
                        <div className="px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none">
                                <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <div className="w-full">
                            <Suspense
                            fallback={
                                <div className="text-sm text-white-500">Loading author...</div>
                            }
                            >
                            <p>{post.createdBy} <span className="text-sm text-gray-500"> @{post.createdBy}</span></p>
                            </Suspense>
                            <p className="text-white-600 mb-4 leading-relaxed">{post.body}</p>
                            
                            <EngagingBar/>
                        </div>
                    </div>
                ))}
            </div>

            <div className="col-span-3 grid-cols-1 mx-5 pt-2">
                <LeftSideBar/>
            </div>
        </div>
    );
}

