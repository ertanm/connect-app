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

  return (
    <>
      <Head>
        <title>Connect App</title>
      </Head>

      <div className="flex h-screen w-screen justify-center items-center bg-gray-100 flex-col ">
        <div className="text-xl font-bold text-gray-600 mb-20">
          <h2>Connect App</h2>
        </div>
        {!username && (
          <div className="flex gap-2">
            {/* Gives error on ref for some reason  */}

            <input
              placeholder="username"
              //@ts-ignore
              ref={usernameRef}
              className="focus:outline-none  focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-xl py-3"
            />
            <button
              onClick={handleUsername}
              className="font-bold inline-flex items-center justify-center rounded-xl px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
              Chat
            </button>
          </div>
        )}

        {username && (
          <div className="border h-1/2 w-1/2 flex flex-col items-center">
            <ChatRooms />
            <Texts />
          </div>
        )}
      </div>
    </>
  );
}
