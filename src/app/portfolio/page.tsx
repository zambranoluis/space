"use client";

import dinamyc from "next/dynamic";

const Portfolio = dinamyc(() => import("@/components/Portfolio/Portfolio"), { ssr: false });

export default function ShoppingCartPage() {
  return <Portfolio />;
}