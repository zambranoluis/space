"use client";
import dinamyc from "next/dynamic";

const Login = dinamyc(() => import("@/components/Login/Login"), { ssr: false });

export default function LoginPage() {
  return <Login />;
}