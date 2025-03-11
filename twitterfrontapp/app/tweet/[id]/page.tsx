import { GetComment, GetPost } from "@/api/ApiCalls";
import BackButton from "@/components/_buttons/backButton";
import EngagingBarPost from "@/components/_EngagingBar/EngagementBar";
import EngagingBar from "@/components/_EngagingBar/page";
import LeftSideBar from "@/components/_lsidebar/lsidebar";
import CommentTextArea from "@/components/_post/CommentTextArea";
import Sidebar from "@/components/_sidebar/Sidebar";
import { extractTime, formatDate, formatDateV2 } from "@/function/DateFormat";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{id:number}>
}) {
    const {id} = await params
    const post = await GetPost(id)
    const comments = await GetComment(id)

    const cookieStore = await cookies()
    const token = await cookieStore.get("token")

    return (
        <div className="bg-black grid grid-cols-10 text-white">
            
            <div className="col-span-2 pl-10 pt-2 text-xl font-bold flex-none">
                <Sidebar/>
            </div>
            <div className="col-span-5 grid-cols-2 flex-none">
                <div className="flex shadow-md p-3 border border-solid border-gray-800">
                    <BackButton/>
                    <div className="">
                        <p className="text-2xl">Post</p>
                    </div>
                </div>
                <div className="shadow-md p-4 text-2xl border border-solid border-gray-700 hover:bg-gray-950">
                    <div className="flex">
                        <div className="px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none">
                                <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <div className="w-full" >
                            <Link href={"profilePage/"+ post.createdBy}>
                                <Suspense
                                fallback={
                                    <div className="text-sm text-white">Loading author...</div>
                                }
                                >
                                <p className="text-xl">{post.createdBy}</p>
                                <p className="text-sm text-gray-500"> @{post.createdBy}  ⸱ {formatDate(post.creatOn)} </p>
                                </Suspense>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-white pl-1 mt-1 mb-3 leading-relaxed">{post.body}</p>
                        <p className="pl-1 pb-1 text-sm text-gray-500">{extractTime(post.creatOn)} ⸱ {formatDateV2(post.creatOn)} ⸱ Nb of views</p>
                    </div>
                    <div className="border-t border-solid border-gray-700 mt-2 ">
                        <div className="pt-2">
                            <EngagingBarPost postId={id}/>
                        </div>
                    </div>
                </div>
                <div className="shadow-md p-5 border border-b-8 border-solid border-gray-700">
                    <CommentTextArea postId={id}/>
                </div>
                {comments.map((comment) => (
                    <div key={comment.id} className="flex shadow-md p-4 border border-solid border-gray-700 hover:bg-gray-950">
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
                            <p><span className="text-xl">{comment.createdBy} </span><span className="text-sm text-gray-500"> @{comment.createdBy}</span></p>
                            </Suspense>
                            <p className="text-white mb-4 leading-relaxed">{comment.content}</p>
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