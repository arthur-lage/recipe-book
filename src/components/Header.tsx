import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { logout } = useAuth();

  return (
    <header className="border-b-[1px] border-zinc-400 flex items-center justify-between px-6 py-4">
      <Link className="font-poppins font-bold text-xl" to="/">
        Recipe Book
      </Link>

      <button
        className="rounded-md px-4 py-1 text-lg font-bold font-poppins text-white bg-gradient-to-br from-rose-600 to-rose-500"
        onClick={logout}
      >
        Logout
      </button>
    </header>
  );
}
