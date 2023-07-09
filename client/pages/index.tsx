import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Texts from "@/components/Texts";
import ChatRooms from "@/components/ChatRooms";
import { useSockets } from "@/context/socketContext";

export default function Home() {
  const { socket, username, setUsername } = useSockets(); // as any fixes socket issue for some reason.

  const usernameRef = useRef();

  function handleUsername() {
    //@ts-ignore
    //current.value might be null error, no fix ?
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }

    setUsername(value);
    localStorage.setItem("user", value);
  }

  useEffect(() => {
    if (usernameRef) {
      //@ts-ignore
      usernameRef.current.value = localStorage.getItem("username") || "";
    }
  }, []);

  return (
    <>
      <Head>
        <title>Connect App</title>
      </Head>

      <div className="flex h-screen w-screen justify-center items-center bg-gray-900 flex-col ">
        <div className="text-2xl pt-5 font-bold text-white mb-20">
          <h2>Connect App</h2>
        </div>
        {!username && (
          <div className="flex gap-2 bg-gray-800 p-2 rounded-2xl">
            {/* Gives error on ref for some reason  */}

            <input
              placeholder="Enter a username"
              //@ts-ignore
              ref={usernameRef}
              className="focus:outline-none placeholder:text-white bg-gray-800 placeholder:bg-gray-800 text-white placeholder-gray-600 pl-12 py-3"
            />
            <button
              onClick={handleUsername}
              className="font-bold inline-flex items-center justify-center rounded-2xl px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-700 hover:bg-blue-400 focus:outline-none">
              Chat
            </button>
          </div>
        )}

        {username && (
          <div className="h-screen w-screen flex flex-row p-20">
            <div className="flex-shrink-0 w-1/3 h-full bg-gray-800 rounded-l-xl">
              <ChatRooms />
            </div>
            <div className="flex-grow w-2/3 h-full bg-gray-800 rounded-r-xl">
              <Texts />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
