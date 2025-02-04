"use client";

import dinamyc from "next/dynamic";

const CreateAccount = dinamyc(() => import("@/components/CreateAccount/CreateAccount"), { ssr: false });

export default function CreateAccountPage() {
  return <CreateAccount />;
}
