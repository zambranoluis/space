"use client";

import dinamyc from "next/dynamic";

const Questionnaire = dinamyc(() => import("@/components/Questionnaire/Questionnaire"), { ssr: false });

export default function ShoppingCartPage() {
  return <Questionnaire />;
}
