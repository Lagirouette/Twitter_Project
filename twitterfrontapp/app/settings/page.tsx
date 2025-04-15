"use client"

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decremented, incremented } from '@/store/slice'
import { RootState } from '@/store/store'
import { getData } from '@/features/Posts'
import { Post, UserJson } from '@/api/Types'
import Spinner from '@/components/_spinner/Spinner'

export default function Settings() {
  const count = useSelector((state:RootState) => state.counter.value)
  // const users = useSelector((state:RootState) => state.users)
  const posts = useSelector((state:RootState) => state.posts)
  const dispatch = useDispatch<any>()

  // console.log(users)
  console.log(posts)

  // if(!users.data && !users.loading && !users.error){
  //   dispatch(getData())
  // }
  // let content
  // if(users.loading){
  //   content = <h1>Loading ....</h1>
  // }
  // else if(users.error){
  //   content = <p className='text-red-500'>An error has occured</p>
  // }
  // else if(users.data){
    
  //   const liste : UserJson[] = users.data
  //   content = (
  //     <ul>
  //       {liste.map((user:UserJson) => (
  //           <li className='text-xl' key={user.id}>
  //             {user.name}
  //           </li>
  //         ))
  //       }
  //     </ul>
  //   )
  // }


  if(!posts.data && !posts.loading && !posts.error){
    dispatch(getData())
  }
  let PostsContent
  if(posts.loading){
    PostsContent = <Spinner/>
  }
  else if(posts.error){
    PostsContent = <p className='text-red-500'>An error has occured</p>
  }
  else if(posts.data){
    
    const liste : Post[] = posts.data
    PostsContent = (
      <ul>
        {liste.map((post:Post) => (
            <li className='text-xl' key={post.id}>
              {post.createdBy}
              {post.body}
            </li>
          ))
        }
      </ul>
    )
  }

  return (
    <>
      {/* <div>
        <button
          className='mx-2 border-collapse rounded-xl bg-green-500'
          aria-label="Increment value"
          onClick={() => dispatch(incremented())} // C'est le contraire qu'il se passe 
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          className='mx-2 border-collapse rounded-xl bg-red-500'
          aria-label="Decrement value"
          onClick={() => dispatch(decremented())} // C'est le contraire qu'il se passe, je n'en connais pas encore la raison. 
        >
          Decrement
        </button>
      </div> */}

      {/* <div>
        <h1>Lists users on the fake api : </h1>
        {content}
      </div> */}

      <div className='mt-4'>
        <h1>Lists posts on the real api : </h1>
        {PostsContent}
      </div>

    </>
  )
}