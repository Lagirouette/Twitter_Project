import { RecupRealToken } from "@/Token/RecupToken";
import { DateArg, DateValues } from "date-fns";
import { DateSchema } from "yup";

type Post = {
    id: number;
    createdBy: string;
    creatOn: string;
    body: string;
    createdByPseudo:string;
}

type Comment = {
    id: number;
    createdBy: string;
    createOn: string;
    postId: number;
    content: string;
}

export async function GetAllPost(){
    const response = await fetch("http://localhost:5130/api/post")
    const posts: Post[] = await response.json()
    console.log(posts)
    return posts 
}

export async function GetPost(id: number){
    const response = await fetch(`http://localhost:5130/api/post/${id}`)
    const posts: Post = await response.json()
    console.log(posts)
    console.log(posts.creatOn)

    return posts
}

export async function GetComment(id: number){
    const response = await fetch(`http://localhost:5130/api/comment/all/${id}`)
    const comments: Comment[] = await response.json()
    
    return comments
}

export async function LoginTwitter(username: string | undefined, password: string | undefined){ 
    const data =  await fetch("http://localhost:5130/api/account/login", {
        method:"POST",
        headers:{"Content-Type": "application/json; charset=utf-8"},
        credentials:"same-origin",
        body: JSON.stringify({
            userName:username,
            passWord:password
        })
    })
    return data
}

export async function CreateNewComment(comment: string | undefined, postId: number){
    const token = await RecupRealToken()
    const data =  await fetch(`http://localhost:5130/api/comment/${postId}`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        credentials:"same-origin",
        body: JSON.stringify({
            content:comment
        })
    })
    return data
}

export async function CreateNewPost(tweet: string | undefined){
    const token = await RecupRealToken()
    const data =  await fetch("http://localhost:5130/api/post", {
        method:"POST",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        credentials:"same-origin",
        body: JSON.stringify({
            body:tweet
        })
    })
    return data
}

export async function GetLike(id: number){
    const response = await fetch(`http://localhost:5130/api/like/${id}`)
    const nbLike: number = await response.json()
    
    return nbLike
}