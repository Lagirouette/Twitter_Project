"use client"
import { useRouter } from "next/navigation";


export default function BackButton() {
    const router = useRouter()

    return (
       <button className="pr-10" onClick={() => router.back()}>
            <svg className="h-8 w-8 text-sky-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
            </svg>
        </button>
    );
}