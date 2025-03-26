export interface User {
    id: string;
    userName: string;
    pseudo: string;
    email: number;
    profil: string;
}

export interface Post{
    id: number;
    createdBy: string;
    creatOn: string;
    body: string;
    createdByPseudo:string;
    imageId:number
}

export interface Comments{
    id: number;
    createdBy: string;
    createOn: string;
    postId: number;
    content: string;
}

export interface Follow{
    id: number;
    followedby: string;
    userId: string;
    user: User;
}