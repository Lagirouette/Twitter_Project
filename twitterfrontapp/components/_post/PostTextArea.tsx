"use client"

import { CreateNewPost, PostImage } from '@/api/ApiCalls'
import { RecupTokenBool } from '@/Token/RecupToken'
import { useRouter } from 'next/navigation'
import React, { SyntheticEvent, useState } from 'react'

export default function PostTextArea(){
    const [tweet, setTweet] = useState("")
    const [image, setImage] = useState<File>()
    const router = useRouter()

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault()
        
        const token = await RecupTokenBool()

        try{
           if(token){ 
            const post = await CreateNewPost(tweet)

            if(image){
                await PostImage(post.id, image)
            }

            await router.refresh()
          }
        }catch(e){
          console.log(e)
        }
      }
    
  return (
    <>
        <form action="" onSubmit={submit}>
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-8 w-8 flex-none">
                    <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <textarea 
                className="bg-black pl-3 w-full resize-none focus:outline-none focus:border-b" 
                placeholder="What's happening ? "
                onChange={e=> setTweet(e.target.value)}
                />
                <p className={`${(tweet?.length==0) && 'hidden'} ${(tweet.length>280) && 'text-red-600'} mt-auto font-mono`}>{tweet?.length}/280</p>
            </div>
            <div className='flex w-full pt-2'>
                <svg className="size-10 py-2 text-sky-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-10 py-2 text-sky-500">
                    <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm4.026 2.879C5.356 7.65 5.72 7.5 6 7.5s.643.15.974.629a.75.75 0 0 0 1.234-.854C7.66 6.484 6.873 6 6 6c-.873 0-1.66.484-2.208 1.275C3.25 8.059 3 9.048 3 10c0 .952.25 1.941.792 2.725C4.34 13.516 5.127 14 6 14c.873 0 1.66-.484 2.208-1.275a.75.75 0 0 0 .133-.427V10a.75.75 0 0 0-.75-.75H6.25a.75.75 0 0 0 0 1.5h.591v1.295c-.293.342-.6.455-.841.455-.279 0-.643-.15-.974-.629C4.69 11.386 4.5 10.711 4.5 10c0-.711.19-1.386.526-1.871ZM10.75 6a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Zm3 0h2.5a.75.75 0 0 1 0 1.5H14.5v1.75h.75a.75.75 0 0 1 0 1.5h-.75v2.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-10 py-2 text-sky-500">
                    <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                </svg>
                <svg className="size-10 py-2 text-sky-500"  viewBox="0 0 24 24"  width="24"  height="24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  strokeWidth="2">  <circle cx="12" cy="12" r="10" />  <path d="M8 14s1.5 2 4 2 4-2 4-2" />  <line x1="9" y1="9" x2="9.01" y2="9" />  <line x1="15" y1="9" x2="15.01" y2="9" /></svg>

                <div className='ms-auto flex'>
                    <label htmlFor="image_uploads">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 py-2 text-sky-500 hover:text-sky-800 active:text-white">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule={"evenodd"}/>
                        </svg>
                    </label>
                    <input className="hidden" type="file" id="image_uploads" name="image_uploads" onChange={e => {if(e.target.files)setImage(e.target.files[0])}}/>
                    <span className='mr-2 h-full text-2xl'>|</span>
                    <button type='submit' className=' bg-sky-500 hover:bg-sky-800 rounded-full py-2 px-3 place-self-end font-bold'>Tweet</button>
                </div>    

            </div>
        </form>
    </>
  )
}