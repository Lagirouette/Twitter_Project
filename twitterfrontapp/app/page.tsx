import Sidebar from "@/components/_sidebar/Sidebar";
import PostTextArea from "@/components/_post/PostTextArea";
import LeftSideBar from "@/components/_lsidebar/lsidebar";
import { LogoutButton } from "@/components/_buttons/logout";
import { cookies } from "next/headers";
import LoginButton from "@/components/_buttons/login";
import ListPost from "@/components/ListPost";


export default async function Feed() {
    const cookieStore = await cookies()
    const token = await cookieStore.get("token")
    
    return (
        <div className="bg-black grid grid-cols-10 text-white">
            <div className="col-span-2 pl-10 pt-2 text-xl font-bold flex-none">
                <Sidebar/>
            </div>
            <div className="col-span-5 grid-cols-2 flex-none">
                <div className="flex shadow-md p-3 border-x border-solid border-gray-700">
                    <h1 className="font-bold text-xl">Home</h1>
                    <div className="ms-auto">
                        {token && <LogoutButton/> }
                    </div>
                </div>
                <div className="shadow-md p-5 border border-b-8 border-solid border-gray-700">
                    <PostTextArea/>
                </div>
                <ListPost/>
            </div>
            <div className="col-span-3 grid-cols-1 mx-5 pt-2">
                <LeftSideBar/>
            </div>
        </div>
    );
}

