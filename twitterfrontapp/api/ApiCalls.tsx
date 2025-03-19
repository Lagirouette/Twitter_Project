import { RecupRealToken, RecupToken, RecupTokenBool } from "@/Token/RecupToken";
import "@/api/Types"
import { Comments, Post, User } from "@/api/Types";


export async function GetUser(userName:string){
    const response = await fetch(`http://localhost:5130/api/account/${userName}`)
    const user: User = await response.json()
    return user 
}

export async function GetUserFromId(id:string){
    const response = await fetch(`http://localhost:5130/api/account/id/${id}`)
    const user: User = await response.json()
    return user.id 
}

export async function GetIdUser(userName:string){
    const response = await fetch(`http://localhost:5130/api/account/getid/${userName}`)
    const user: User = await response.json()
    return user.id 
}

export async function UpdateProfile(Profil: string){
    const token = await RecupRealToken()
    const data =  await fetch(`http://localhost:5130/api/account/profil?profil=${Profil}`, {
        method:"PUT",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        credentials:"same-origin"
    })
    return data
}

export async function GetAllPost(){
    const response = await fetch("http://localhost:5130/api/post")
    const posts: Post[] = await response.json()
    return posts 
}

export async function GetUserPosts(userId:string) {
    const response = await fetch(`http://localhost:5130/api/post/${userId}`)
    const posts: Post[] = await response.json()
    return posts
}

export async function GetPost(id: number){
    const response = await fetch(`http://localhost:5130/api/post/${id}`)
    const posts: Post = await response.json()
    return posts
}

export async function GetComment(id: number){
    const response = await fetch(`http://localhost:5130/api/comment/all/${id}`)
    const comments: Comments[] = await response.json()
    
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

    if(data.ok){
        const resp = await data.json()
        return resp
    }else{
        throw new Error("Failed to login")
    }
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

export async function CreateNewPost(tweet: string){
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

export async function PostLike(id: number){
    const token = await RecupRealToken()
    const response = await fetch(`http://localhost:5130/api/like/${id}`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        credentials:"same-origin"
    })
    const nbLike = await response.json()
    
    return nbLike
}

export async function DeleteLike(id: number){
    const token = await RecupRealToken()
    await fetch(`http://localhost:5130/api/like/${id}`, {
        method:"DELETE",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        credentials:"same-origin"
    })
}


export async function GetIfLiked(id: number){
    //if the user liked u get a false. If he didnt liked u get True and ur good to go
    const existentToken = await RecupTokenBool()
    if(existentToken == true){
        const token = await RecupRealToken()
        const response = await fetch(`http://localhost:5130/api/like/status/${id}`, {
            method:"GET",
            headers:{
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            credentials:"same-origin"
        })
        const statusLike : boolean = await response.json()

        return statusLike
    }else{
        console.log("erreur !!")
    }
}

export async function Follow(userName: string){
    const token = await RecupRealToken()
    const user = await GetIdUser(userName)
    
    const data =  await fetch(`http://localhost:5130/api/follow/${user}`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        credentials:"same-origin"
    })
    return data
}

export async function Unfollow(userName: string){
    const token = await RecupRealToken()
    const userId = await GetIdUser(userName)
    
    await fetch(`http://localhost:5130/api/follow/${userId}`, {
        method:"DELETE",
        headers:{
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        credentials:"same-origin"
    })
}

export async function GetIfFollow(userName: string){

    const existentToken = await RecupTokenBool()
    const userId = await GetIdUser(userName)

    if(existentToken == true){
        const token = await RecupRealToken()
        const response = await fetch(`http://localhost:5130/api/follow/IfUserIsFollowing/${userId}`, {
            method:"GET",
            headers:{
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            credentials:"same-origin"
        })
        const statusFollow : boolean = await response.json()
        return statusFollow
    }else{
        console.log("erreur !!")
    }
}

export async function GetFollowers(userName:string){
    const response = await fetch(`http://localhost:5130/api/follow/followers/${userName}`)
    const user: User = await response.json()
    return user.id 
}

export async function GetNumberOfFollowers(userName:string){
    const response = await fetch(`http://localhost:5130/api/follow/nbfollowers/${userName}`)
    const NumberOfFollowers: number = await response.json()
    return NumberOfFollowers
}

export async function GetFollowings(userName:string){
    const response = await fetch(`http://localhost:5130/api/follow/followings/${userName}`)
    const user: User = await response.json()
    return user.id 
}

export async function GetNumberFollowings(userName:string){
    const response = await fetch(`http://localhost:5130/api/follow/nbsfollowings/${userName}`)
    const NumberFollowings: number = await response.json()
    return NumberFollowings
}