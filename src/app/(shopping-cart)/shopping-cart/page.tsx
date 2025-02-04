"use client";

import dinamyc from "next/dynamic";

const ShoppingCart = dinamyc(() => import("@/components/ShoppingCart/ShoppingCart"), { ssr: false });

export default function ShoppingCartPage() {
  return <ShoppingCart />;
}
