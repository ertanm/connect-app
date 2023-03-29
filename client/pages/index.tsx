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
      <div>
        {!username && (
          <div>
            {/* Gives error on ref for some reason  */}
            {/* @ts-ignore */}
            <input placeholder="username" ref={usernameRef} />
            <button onClick={handleUsername}>Chat</button>
          </div>
        )}

        {username && (
          <div>
            <ChatRooms />
            <Texts />
          </div>
        )}
      </div>
    </>
  );
}
