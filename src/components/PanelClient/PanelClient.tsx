"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import Section from "./Section";

import NavbarClient from "@/components/NavbarClient";

import AsideClient from "@/components/AsideClient";

import ChatModal from "@/components/ChatModal";

import { apiService } from "@/services/apiService";

import { useSession } from "next-auth/react";

interface Area {
  nameArea: string;
  isActive: boolean;
}

interface Extra {
  extra: {
    name: string;
  };
  isActive: boolean;
}

interface Product {
  name: string;
  type: string;
}

interface Purchase {
  _id: string;
  product: Product;
  selectedAreas: Area[];
  extras: Extra[];
  total: number;
  status: string;
}

interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  }[];
  skype: string;
  address: string;
  birthdate: string;
}

interface PanelClientProps {
  // setAsideSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const PanelClient: React.FC<PanelClientProps> = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(false);
  const [errorCustomer, setErrorCustomer] = useState<string | null>(null);

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState<boolean>(false);
  const [errorPurchases, setErrorPurchases] = useState<string | null>(null);

  const getCustomer = useCallback(async () => {
    if (!userId) return; // Si no hay usuario autenticado, salir de la función

    setIsLoadingCustomer(true);
    setErrorCustomer(null);
    try {
      const response = await apiService.getCustomer(userId);
      if (response) {
        setTimeout(() => {
          setCustomer(response);
        }, 300);
        setIsLoadingCustomer(false);
      }
    } catch (err) {
      setErrorCustomer("Error al obtener el cliente.");
    }
  }, [userId]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  const getPurchasesByCustomer = useCallback(async () => {
    if (!userId) return; // Si no hay usuario autenticado, salir de la función

    setIsLoadingPurchases(true);
    setErrorPurchases(null);
    try {
      console.log("userId Request:", userId);
      const response = await apiService.getPurchasesByCustomerId(userId);
      console.log("response purchases:", response);
      if (response) {
        setPurchases(response.data);
        setIsLoadingPurchases(false);
      }
    } catch (err) {
      setErrorPurchases("Error al obtener el cliente.");
    }
  }, [userId]);

  useEffect(() => {
    getPurchasesByCustomer();
  }, [getPurchasesByCustomer]);

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
