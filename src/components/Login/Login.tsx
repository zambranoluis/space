"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useGeolocation } from "@/context/GeolocationContext";

import Section from "./Section";

export default function Login() {
  const router = useRouter();
  const { fetchGeolocation, geolocation } = useGeolocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }
    setError("");
    setLoadingLogin(true);

    await fetchGeolocation();

    const result = await signIn("credentials", {
      email,
      password,
      geolocation,
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
  );
}