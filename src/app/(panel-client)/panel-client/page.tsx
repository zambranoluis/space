"use client";

import React from "react";
import dynamic from "next/dynamic";

const PanelClient = dynamic(() => import("@/components/PanelClient/PanelClient"), { ssr: false });



const PanelClientPage: React.FC = () => {
  return <PanelClient  />;
};

export default PanelClientPage;
