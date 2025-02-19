"use client";

import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import UserDataForm from "./components/UserDataForm";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { decodeJwt } from "jose";

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

function Home() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const isClient = typeof window !== "undefined"; // Check if running on client

  // Load user from localStorage on client-side only
  useEffect(() => {
    if (isClient) {
      const storedUser = localStorage.getItem("current_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [isClient]);

  // Callback for the GoogleLogin button
  const loginButton = (credentialResponse: CredentialResponse) => {
    if (!isClient) return; // Prevent running on the server

    const { credential } = credentialResponse;
    if (credential) {
      const payload = decodeJwt(credential) as { name: string; email: string; picture: string };
      const currentUser: GoogleUser = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };
      localStorage.setItem("current_user", JSON.stringify(currentUser));
      setUser(currentUser);
    }
  };

  return (
    <div>
      {user ? (
        <div className="h-full w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 md:hover:scale-105 min-h-max transition-all duration-500">
            <Counter />
            <UserDataForm />
          </div>
          <div className="w-full p-4">
            <RichTextEditor />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          {isClient && (
            <GoogleLogin
              onSuccess={loginButton}
              onError={() => {
                console.error("Login Failed");
              }}
              useOneTap
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
