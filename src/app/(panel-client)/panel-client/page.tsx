"use client";

import dinamyc from "next/dynamic";

const PanelClient = dinamyc(() => import("@/components/PanelClient/PanelClient"), { ssr: false });

export default function PanelClientPage() {
  return <PanelClient />;
}
