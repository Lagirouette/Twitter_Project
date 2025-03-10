
import { GetAllPost } from "@/api/ApiCalls";
import Link from "next/link";
import { Suspense } from "react";
import EngagingBarPost from "./_EngagingBar/EngagementBar";
import { formatDate } from "@/function/DateFormat";

const posts= await GetAllPost()

export default async function ListPost() {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="flex shadow-md p-4 border border-solid border-gray-700 hover:bg-gray-950">
                    <div className="px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none">
                            <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <div className="w-full" >
                        <Suspense
                        fallback={
                            <div className="text-sm text-white">Loading author...</div>
                        }
                        >
                        <Link href={"profilePage/"+ post.createdBy}>
                            <p ><span className="text-xl">{post.createdBy} </span><span className="text-sm text-gray-500"> {post.createdByPseudo}</span> <span> ⸱ {formatDate(post.creatOn)}</span></p>
                        </Link>
                        </Suspense>
                        <Link href={"tweet/"+post.id}>
                            <p className="text-white mb-4 leading-relaxed">{post.body}</p>
                        </Link>
                        <EngagingBarPost postId={post.id}/>
                    </div>
                </div>
            ))}
        </div>
    );
}