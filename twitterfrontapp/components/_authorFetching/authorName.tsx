type Author = {
    id: string;
    name: string;
}

export default async function AuthorName({userId}: {userId: string}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const user: Author = await response.json()

    return (
        <p className="text-xl font-bold">{user.name}</p>
    );
}