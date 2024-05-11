'use client'
import changePassword from "@/helpers/change-pwd";
import { ResponseMessage } from "@/types";
import { passwordRequest } from "@/types/user";
import { SignInResponse, signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"


interface FormData {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState<ResponseMessage | null>(null);
  const onSubmit: SubmitHandler<FormData> = async ({ username, oldPassword, newPassword }) => {
    try {
      const request: passwordRequest = {
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword
    };
        const response = await changePassword(request);
        setErrorMessage(response);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
  
    } catch (error) {
        console.error("Error during sign in:", error);
    }
};
  return (
    <>
    <h1 className="text-3xl font-bold">Change your password</h1>
    <br />
    <form className=" w-[450px] h-[400px] m-auto text-white p-6 rounded-xl" method="post" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <p className={`${errorMessage == ResponseMessage.SUCCESS ? 'text-green-500' : 'text-red-500'}`}>{errorMessage}</p>}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex gap-1 items-center justify-between">
          <label title="Email">Username:</label>
          <input {...register('username')} placeholder="User" className="bg-transparent border border-white rounded-xl p-2" />
          </div>
          <div className="flex gap-1 items-center justify-between">
          <label title="Email">Old Password:</label>
          <input {...register('oldPassword')} type="password" placeholder="Password" className="bg-transparent border border-white rounded-xl p-2" />
          </div>
         <div className="flex gap-1 items-center justify-between">
         <label title="Email">New Password:</label>
          <input {...register('newPassword')} type="password" placeholder="Password" className="bg-transparent border border-white rounded-xl p-2" />
        </div>
        </div>
        <button className="bg-blue-600 font-bold rounded-sm p-2 text-white w-full" type="submit">Submit</button>
      </form>
      </>
  )
}
