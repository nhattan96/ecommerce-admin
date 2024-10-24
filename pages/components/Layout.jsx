import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./Nav";

export default function Layout({ children }) {
  const { data: session } = useSession();

  const sessionTemp = {
    user: {
      name: "Kyo Mega",
      email: "omega6192000@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJnUqYp3XJg2-6F2h8g1RHpW_5gkrcq9YHc0KsArl_s5LU6os0=s96-c",
    },
    expires: "2024-11-22T07:22:32.432Z",
  };

  if (!session && !sessionTemp) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      {/* {console.log(JSON.stringify(session))} */}
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        <div>Logged in {sessionTemp.user.name}</div>
        {/* {session.user.email} */}
        {children}
      </div>
    </div>
  );
}
