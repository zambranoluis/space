'use client'

import dinamyc from "next/dynamic"

const Faqs = dinamyc(() => import("@/components/Faqs/Faqs"), { ssr: false });





export default function FaqsPage (){
  return <Faqs />
}