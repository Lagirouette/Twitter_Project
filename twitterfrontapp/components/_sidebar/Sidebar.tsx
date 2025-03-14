"use client"
import { RecupTokenBool } from '@/Token/RecupToken'
import { RecupPseudo, RecupUserInfos } from '@/Token/RecupUserName'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export interface MenuItem {
    title: string;
    route?: string;
    children?: MenuItem[];
  }

const menuItem: MenuItem = 
  {
    title: "Products",
    children: [
      {
        title: "Settings",
        route: "/parameters",
      },
      {
        title: "About Us",
        route: "",
      },
      {
        title: "Home",
        route: "",
      },
    ],
  }
;


export default function Sidebar() {
    const[cookieCheck, setCheck] = useState(false)
    const[username, setName] = useState("")
    const[pseudo, setPseudo] = useState("")

    useEffect(() => {
        async function ConfigToken() {
            const cookieCheck = await RecupTokenBool()
            if (cookieCheck){
                setCheck(true)
                const username = await RecupUserInfos()
                const pseudo  = await RecupPseudo()

                setName(username)
                setPseudo(pseudo)
            }
        }
        ConfigToken()
      }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuItems = menuItem?.children ? menuItem.children : [];

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";



    return (
    <div className='h-full'>
        <Link href="/"><svg className="h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
        </svg>
        </Link>
        <div className='py-7'>
            <div className='menu py-4'>
                <a className='hover:text-sky-500 flex' href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    <label htmlFor="" className='py-1 pl-4'>Home</label>
                </a> 
            </div>
            <div className='menu py-4'>
                <a className='hover:text-sky-500 flex' href="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                    <label htmlFor="" className='py-1 pl-4'>Explore</label>
                </a> 
            </div>
            <div className='menu py-4'>
                <a className='hover:text-sky-500 flex' href="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <label htmlFor="" className='py-1 pl-4'>Notifications</label>
                </a> 
            </div>
            <div className='menu py-4'>
                <a className='hover:text-sky-500 flex' href="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <label htmlFor="" className='py-1 pl-4'>Messages</label>
                </a> 
            </div>
            <div className='menu py-4'>
                <a className='hover:text-sky-500 flex' href="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    <label htmlFor="" className='py-1 pl-4'>Bookmarks</label>
                </a> 
            </div>
            <div className='menu py-4'>
                <a className='hover:text-sky-500 flex' href="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>

                    <label htmlFor="" className='py-1 pl-4'>Lists</label>
                </a> 
            </div>
            <div className='menu py-4'>
                <Link className='hover:text-sky-500 flex' href={cookieCheck ? "/profilePage/"+ username : "/profilepage/notfound"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <label htmlFor="" className='py-1 pl-4'>Profile</label>
                </Link> 
            </div>
            <div className='menu py-4'>
                <button className='hover:text-sky-500 flex' onClick={toggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 size-6 h-8 w-8 flex-none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <label htmlFor="" className='py-1 pl-4'>More</label>
                </button>
                <div className={`absolute bottom-40 z-40 w-[250px] min-h-[100px] flex flex-col py-4 bg-gray-700 rounded-md ${transClass}`}>
                    {
                        menuItems.map(item =>
                            <Link
                                key={item.title}
                                className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1"
                                href={item?.route || ''}
                                onClick={toggle}
                            >{item.title}</Link>
                        )
                    }
                </div>
            </div>
            {
                isOpen
                    ?
                    <div
                        className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
                        onClick={toggle}
                    ></div>
                    :
                    <></>
            }
        </div>
        {cookieCheck && (
        <div className='flex content-center mt-10'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none mt-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <div className='py-1 pl-4'>
                <p>{username}</p>
                <p className='text-sm text-gray-500'>{pseudo}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none ms-auto mr-5 mt-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </div>
        )}
    </div>
  )
}

