"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const ProtectedRouter = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{session ? children : null}</>;
};

export default ProtectedRouter;
