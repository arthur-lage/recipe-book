import { GoogleLogo } from "@phosphor-icons/react";

import Illustration from "../assets/auth-illustration.svg";
import { useAuth } from "../hooks/useAuth";

export function AuthPage() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-zinc-900 font-medium text-lg font-poppins mb-2">
        Welcome to
      </p>
      <h1 className="text-4xl text-emerald-400 font-bold font-poppins">
        Recipe Book
      </h1>

      <div className="my-12 rounded-full w-[14rem] h-[14rem] flex items-center justify-center bg-emerald-400">
        <img className="w-[10rem]" src={Illustration} alt="" />
      </div>

      <button
        onClick={signInWithGoogle}
        className="bg-emerald-500 px-2 py-2 rounded-md flex items-center gap-3"
      >
        <GoogleLogo size={32} weight="fill" className="text-white" />
        <span className="text-lg font-medium font-poppins text-white">
          Login with Google
        </span>
      </button>
    </div>
  );
}
