import Link from "next/link";

export default function LoginBanner() {
    return (
        <div className="flex justify-end">
            <p className="pt-4 pr-3 font-bold">Are you not log in ? </p>
            <Link href={"/register"}><button type='button' className=' bg-gray-500 hover:bg-sky-800 rounded-full mt-2 py-2 px-3 place-self-end font-bold'>Sign In</button></Link>
            <Link href={"/login"}><button type='button' className=' bg-sky-500 hover:bg-sky-800 rounded-full mt-2 mx-3 py-2 px-3 place-self-end font-bold'>Login</button></Link>
        </div>
    );
}