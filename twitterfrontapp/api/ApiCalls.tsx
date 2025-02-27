
export function GetAllPost(){

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

export async function CreateNewPost(username: string , password: string){
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