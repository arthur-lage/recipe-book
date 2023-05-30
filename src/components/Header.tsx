import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBodyOverflowHidden, setIsBodyOverflowHidden] = useState(false);
  const { logout } = useAuth();

  function handleOpenMenu() {
    setIsMenuOpen((prev) => !prev);
    setIsBodyOverflowHidden((prev) => !prev);
  }

  useEffect(() => {
    if (isBodyOverflowHidden) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isBodyOverflowHidden]);

  return (
    <header className="border-b-[1px] border-zinc-400 flex items-center justify-between px-6 py-4">
      <Link className="font-poppins font-bold text-xl" to="/">
        Recipe Book
      </Link>

      <button className="z-30" onClick={handleOpenMenu}>
        {isMenuOpen ? (
          <X weight="bold" className="text-white" size={36} />
        ) : (
          <List weight="bold" size={36} />
        )}
      </button>

      <div
        className={`
        absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.75)] transition-all duration-150 z-20
        ${
          isMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      ></div>

      <ul
        className={`
        mobile-menu z-30
        ${
          isMenuOpen
            ? "visible opacity-100 fixed"
            : "invisible opacity-0 absolute"
        }`}
      >
        <li className="w-full">
          <Link
            className="mobile-nav-link bg-gradient-to-br from-indigo-600 to-indigo-500"
            to="/recipes/new"
          >
            Create Recipe
          </Link>
        </li>

        <li className="w-full">
          <Link
            className="mobile-nav-link bg-gradient-to-br from-slate-600 to-slate-500"
            to="/recipes/saved"
          >
            Saved Recipes
          </Link>
        </li>

        <li className="w-full">
          <button
            className="mobile-nav-link bg-gradient-to-br from-rose-600 to-rose-500"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </header>
  );
}
