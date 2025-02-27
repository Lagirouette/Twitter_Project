"use client"
import BackButton from "@/components/_buttons/backButton";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"

export default function Register() {
    const [username, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const router = useRouter()

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault()

        try{
            const data = await fetch("http://localhost:5130/api/account/register", {
                method:"POST",
                headers:{"Content-Type": "application/json; charset=utf-8"},
                credentials:"same-origin",
                body: JSON.stringify({
                    userName:username,
                    email:email,
                    passWord:password
                })
            })
            const user = await data.json()
            
            if(user){
            await router.push('/login')
            }
        }catch(e){
            alert("U didnt sign up for some reason u can retry tho")
        }

    }

    return (
        <section className="bg-gray-900">
      <BackButton/>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mb-20 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign up to Twitter 
            </h1>
            <form method="POST" className="space-y-4 md:space-y-6"  onSubmit={submit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={e=> setName(e.target.value)}
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={e=> setEmail(e.target.value)}
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={e=> setPassword(e.target.value)}
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2 text-center focus:ring-primary-800 text-lg"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-400">
                Already have an account ?{" "}
                <a
                  href="/login"
                  className="font-medium hover:underline text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    );
}