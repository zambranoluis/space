"use client"

import dinamyc from "next/dynamic"


const Reviews = dinamyc(() => import("@/components/Reviews/Reviews"), { ssr: false });

export default function ReviewsPage (){
  return <Reviews />
}