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

export interface SelectedExtra {
  extra: string;
  isActive: boolean;
}

interface Purchase {
  customer: string;
    product: string;
    selectedAreas: [
      {
        nameArea: string;
        isActive: boolean;
      },
      {
        nameArea: string;
        isActive: boolean;
      },
    ];
    extras: SelectedExtra[];
    price: number;
    status: string;
    isActive: boolean;
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
  };
  skype: string;
  address: string;
  birthdate: string;
}

const PanelClient: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const getCustomer = useCallback(async () => {
    if (!userId) return; // Si no hay usuario autenticado, salir de la función
    try {
      const response = await apiService.getCustomer(userId);
      if (response && response.data) {
        setCustomer(response.data as Customer); // Cast the response data to Customer type
      }
    } catch (err) {
      console.error("Error fetching customer:", err);
    }
  }, [userId]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  const getPurchasesByCustomer = useCallback(async () => {
    if (!userId) return; // Si no hay usuario autenticado, salir de la función
    try {
      const response = await apiService.getPurchasesByCustomerId(userId);
      if (response?.data && Array.isArray(response.data)) {
        setPurchases(response.data as Purchase[]); // Cast the response data to Purchase[] type
      } else {
        console.warn("Unexpected response format:", response);
        setPurchases([]); // Evitar que purchases tenga un estado indefinido o nulo
      }
    } catch (err) {
      console.error("Error fetching purchases:", err);
      setPurchases([]); // En caso de error, asegurar que purchases sea un array vacío
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