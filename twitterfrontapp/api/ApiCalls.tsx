import { RecupRealToken } from "@/Token/RecupToken";

type Post = {
    createdBy: string;
    createOn: Date;
    title: string;
    body: string;
}

export async function GetAllPost(){
    const response = await fetch("http://localhost:5130/api/post")
    const posts: Post[] = await response.json()
    
    return posts 
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