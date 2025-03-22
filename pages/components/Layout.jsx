import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [isOpenNav, setIsOpenNav] = useState(false);

  const handleOpenNav = () => {
    return setIsOpenNav((prev) => !prev);

  };

  if (!session) {
    return (
      <div className="bg-primary w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
          <p className="text-red-300">
            {/* {status === "unauthenticated" ? "You don't have permission!" : null} */}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="md:hidden flex items-center p-4">
        <button onClick={handleOpenNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Logo customClass={"flex grow justify-center"}></Logo>
      </div>

      <div className="bg-primary min-h-screen flex">
        <Nav isOpenNav={isOpenNav} handleOpenNav={handleOpenNav} />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 p-4 sm:mr-0 sm:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
