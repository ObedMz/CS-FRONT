'use client'
import { SignInResponse, signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"


interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async ({ username, password }) => {
    try {
        const response = await signIn('credentials', { username, password, redirect: false });
        if (response) {
            const { ok, error }: SignInResponse = response;
            if (ok) {
                router.push("/admin");
            } else {
               setErrorMessage("Wrong credentials");
            }
        } else {
          setErrorMessage("No response from signIn");
        }
    } catch (error) {
        console.error("Error during sign in:", error);
    }
};
  return (
    <div title="Login" className="w-full h-screen flex items-center ">
      <form className="w-[300px] h-[400px] m-auto text-white border border-white p-6 rounded-xl" method="post" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-black">Login</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex flex-col gap-2 h-[200px] mt-10">
          <label title="Email">Username:</label>
          <input {...register('username')} placeholder="User" className="bg-transparent border border-white rounded-xl p-2" />

          <label title="Email">Password:</label>
          <input {...register('password')} type="password" placeholder="Password" className="bg-transparent border border-white rounded-xl p-2" />

        </div>
        <button className="bg-blue-600 font-bold rounded-sm p-2 text-white w-full" type="submit">Submit</button>
      </form>
    </div>
  )
}
