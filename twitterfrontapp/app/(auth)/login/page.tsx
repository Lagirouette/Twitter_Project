"use client"
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { TokenCookie } from "./action";
import BackButton from "@/components/_buttons/backButton";
import { LoginTwitter } from "@/api/ApiCalls";


export default function Login() {

  const [username, setName] = useState<string>()
  const [password, setPassword] = useState<string>()
  const router = useRouter()

  const submit = async (e:SyntheticEvent) => {
    e.preventDefault()

    try{
      const data = await LoginTwitter(username, password)

      const user = await data.json()

      if(user){
        await TokenCookie(user.token)
        await router.push('/')
      }
    }catch(e){
      alert("Tu ne tes pas co")
    }
  }

  return (
    <section className="bg-gray-900">
      <BackButton/>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mb-20 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className=" text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium hover:underline text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
   
  );
}