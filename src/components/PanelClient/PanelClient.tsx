"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGeolocation } from "@/context/GeolocationContext";

import Section from "./Section";
import NavbarClient from "@/components/NavbarClient";
import AsideClient from "@/components/AsideClient";
import ChatModal from "@/components/ChatModal";
import { apiService } from "@/services/apiService";
import { useSession } from "next-auth/react";

import {
  Customer,
  DetailedPurchase,
  GetProjectsByPurchasesId,
} from "@/utils/dataInterfaces";

const PanelClient: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { geolocation, fetchGeolocation } = useGeolocation();

  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [purchases, setPurchases] = useState<DetailedPurchase[]>([]);
  const [projects, setProjects] = useState<GetProjectsByPurchasesId[]>([]);
  const [purchasesWithProject, setPurchasesWithProject] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (userId) {
      const fetchCustomer = async () => {
        try {
          const response = await apiService.getCustomer(userId);
          setCustomer(response.data as Customer);
        } catch (err: unknown) {
          console.log("PanelClient: Error fetching customer:", err);
        }
      };
      fetchCustomer();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const fetchPurchases = async () => {
        try {
          const response = await apiService.getPurchasesByCustomerId(userId);
          setPurchases(response.data as DetailedPurchase[]);
        } catch (err: unknown) {
          console.log("PanelClient: Error fetching purchases:", err);
        }
      };
      fetchPurchases();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const getProjectsByPurchasesId = async (
        purchaseList: DetailedPurchase[]
      ) => {
        try {
          const completedPurchases = purchaseList.filter(
            (p) =>
              p._id &&
              p.status &&
              p.status.toLowerCase() === "completed" &&
              p.inProject === true
          );

          const projectRequests = completedPurchases.map((p) =>
            apiService.getProjectByPurchasesId(p._id)
          );
          const responses = await Promise.all(projectRequests);
          setProjects(responses);
        } catch (error) {
          // console.log("Error al obtener proyectos:", error);
        }
      };
      getProjectsByPurchasesId(purchases);
    }
  }, [userId, purchases]);

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

  useEffect(() => {
    if (isPanelPurchases) {
      setAsideSelectedOption("purchases");
    } else {
      setAsideSelectedOption("projects");
    }
  }, [isPanelPurchases]);

  const [asideSelectedOption, setAsideSelectedOption] = useState<string>("");

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta
  }, []);

  const [clientName, setClientName] = useState<string | null>(null);

  useEffect(() => {
    if (customer) {
      setClientName(customer.name + " " + customer.lastname);
    }
  }, [customer]);

  return loading ? (
    <div className="bgwhite absolute h-full w-full top-0 z-[1000] bgred-300 flex justify-center items-center">
      <video autoPlay muted className="objectcover h-full w-full max-w-[650px]">
        <source
          src="https://github.com/BPM94/SCCTMD/raw/main/RedezignitLoaderWeb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  ) : (
    <main className="flex flex-col h-full w-full relative rose-400">
      <NavbarClient geolocation={geolocation} clientName={clientName} />
      <AsideClient
        toggleAside={toggleAside}
        isAsideOpen={isAsideOpen}
        toggleSiteContainer={toggleSiteContainer}
        asideSelectedOption={asideSelectedOption}
      />
      <div className="absolute h-screen w-full">
        <Section
          closeSiteContainer={closeSiteContainer}
          asideSelectedOption={asideSelectedOption}
          customer={customer}
          purchases={purchases}
          projects={projects}
          setProjects={setProjects}
          purchasesWithProject={purchasesWithProject}
        />
      </div>
      <div className="flex bgred-200 absolute bottom-[10px] items-end right-[10px] z-[3000]">
        <ChatModal />
      </div>
    </main>
  );
};

export default PanelClient;
