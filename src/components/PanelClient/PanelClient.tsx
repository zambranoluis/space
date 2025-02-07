"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import Section from "./Section";
import NavbarClient from "@/components/NavbarClient";
import AsideClient from "@/components/AsideClient";
import ChatModal from "@/components/ChatModal";
import { apiService } from "@/services/apiService";
import { useSession } from "next-auth/react";

import {
  Customer,
  DetailedPurchase
} from "@/utils/dataTypes"

const PanelClient: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [purchases, setPurchases] = useState<DetailedPurchase[]>([]);


  useEffect(() => {
    if (userId) {
      const fetchPurchases = async () => {
        try {
          const response = await apiService.getPurchasesByCustomerId(userId);
          setPurchases(response.data as DetailedPurchase[]);
        } catch (err: unknown) {
          console.error("PanelClient: Error fetching purchases:", err);
        } finally {
          
        }
      };
      fetchPurchases();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchCustomer = async () => {
        try {
          const response = await apiService.getCustomer(userId);
          setCustomer(response.data as Customer); // Use the as keyword to assert the type
        } catch (err: unknown) {
          console.error("PanelClient: Error fetching customer:", err);
        } finally {
  
        }
      };
      fetchCustomer();
    }
  }, [userId]);

  const closeSiteContainer = () => {
    const container = document.getElementById(`siteContainer`);
    if (container?.classList.contains("togglePanel")) {
      return;
    } else {
      container?.classList.add("togglePanel");
    }
  };

  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const panel = searchParams.get("panel");
  const isPanelPurchases = panel === "purchases";

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isPanelPurchases) {
      setAsideSelectedOption("purchases");
    } else {
      setAsideSelectedOption("projects");
    }
  }, [isPanelPurchases]);

  const [asideSelectedOption, setAsideSelectedOption] = useState<string>("");

  const toggleSiteContainer = (tag: string) => {
    const container = document.getElementById(`siteContainer`);
    if (tag !== asideSelectedOption) {
      if (container?.classList.contains("togglePanel")) {
        setAsideSelectedOption(tag);
        container?.classList.remove("togglePanel");
      } else {
        container?.classList.add("togglePanel");
        setTimeout(() => {
          setAsideSelectedOption(tag);
        }, 300);
        setTimeout(() => {
          container?.classList.remove("togglePanel");
        }, 300);
      }
    } else if (tag === asideSelectedOption) {
      if (container?.classList.contains("togglePanel")) {
        container?.classList.remove("togglePanel");
      }
    }
  };

  return (
    <main className='flex flex-col h-full w-full relative'>
      <NavbarClient />
      <AsideClient
        toggleAside={toggleAside}
        isAsideOpen={isAsideOpen}
        toggleSiteContainer={toggleSiteContainer}
        asideSelectedOption={asideSelectedOption}
      />
      <div className='absolute h-screen w-full'>
        <Section
          closeSiteContainer={closeSiteContainer}
          asideSelectedOption={asideSelectedOption}
          customer={customer}
          purchases={purchases}
        />
      </div>
      <div className='flex bgred-200 absolute bottom-[10px] items-end  right-[10px] z-[3000]'>
        <ChatModal />
      </div>
    </main>
  );
};

export default PanelClient;