"use client"


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Section from "./Section";

export default function Login() {

const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [geolocation, setGeolocation] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getGeolocation = async () => {
    return new Promise<string | null>((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude},${longitude}`);
          },
          () => resolve(null),
        );
      } else {
        resolve(null);
      }
    });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }
    setError("");
    setLoadingLogin(true);

    const location = await getGeolocation();
    setGeolocation(location);


    const result = await signIn("credentials", {
      email,
      password,
      geolocation: location,
      redirect: false,
    });

    
    if (result?.error) {
      setLoadingLogin(false);
      setError(result.error || "Invalid login credentials");
    } else if (result?.ok) {
      setLoadingLogin(false);
      router.push("/panel-client");
    }
  };


  return (
    <section id="login">
      <Section
        handleLogin={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
        error={error}
        loadingLogin={loadingLogin}
        
      />
    </section>
  )
}