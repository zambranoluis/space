"use client";

import dinamyc from "next/dynamic";

const Home = dinamyc(() => import("@/components/Home/Home"), { ssr: false });

export default function HomePage() {
  return <Home />;
}
