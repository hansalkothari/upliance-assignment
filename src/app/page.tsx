"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Counter from "./components/Counter";
import RichTextEditor from "./components/RichTextEditor";
import UserDataForm from "./components/UserDataForm";
import { useGoogleOneTapLogin, GoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Load user from localStorage on client-side only
  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Google One Tap Login configuration
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const { credential } = credentialResponse;
      if (credential) {
        const payload = decodeJwt(credential);
        const currentUser = {
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
        };
        localStorage.setItem("current_user", JSON.stringify(currentUser));
        setUser(currentUser);
      }
    },
    onError: () => console.error("Error logging in"),
  });

  // Callback for the GoogleLogin button
  const loginButton = (credentialResponse: any) => {
    const { credential } = credentialResponse;
    if (credential) {
      const payload = decodeJwt(credential);
      const currentUser = {
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
          <GoogleLogin
            onSuccess={loginButton}
            onError={() => {
              console.error("Login Failed");
            }}
            useOneTap
          />
        </div>
      )}
    </div>
  );
}
