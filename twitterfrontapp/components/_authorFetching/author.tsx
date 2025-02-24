type Author = {
    id: string;
    name: string;
}

export default async function AuthorFetching({userId}: {userId: string}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const user: Author = await response.json()

    return (
        <div className="">
            <p>{user.name} <span className="text-sm text-gray-500"> @{user.name}</span>
            </p>
        </div>
    );
}