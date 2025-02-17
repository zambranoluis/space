import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/apiService";
import { Image } from "@nextui-org/image";
import { FaTags } from "react-icons/fa6";
import Section from "./Section";

import { DetailedPurchase} from "@/utils/dataInterfaces";

const typePurchase = [
  {
    name: "All Purchases",
    icon: <FaTags className='text-2xl' />,
  },
  {
    name: "Pending",
    icon: (
      <Image
        src={
          "https://github.com/BPM94/SCCTMD/raw/main/purchases/purchasePendingSpaceColorsGreen.png"
        }
        className='w-[25px] h-[25px] rounded-none'
        alt=''
      />
    ),
  },
  {
    name: "Completed",
    icon: (
      <Image
        src={
          "https://github.com/BPM94/SCCTMD/raw/main/purchases/purchaseCompletedColorsGreen.png"
        }
        className='w-[25px] h-[25px] rounded-none'
        alt=''
      />
    ),
  },
  {
    name: "Canceled",
    icon: (
      <Image
        src={
          "https://github.com/BPM94/SCCTMD/raw/main/purchases/purchaseCanceledColorsGreen.png"
        }
        className='w-[25px] h-[25px] rounded-none'
        alt=''
      />
    ),
  },
];

interface PurchasesProps {
  purchases: DetailedPurchase[];
  purchasesWithProject: string[]
}

export const Purchases: React.FC<PurchasesProps> = ({ purchases, purchasesWithProject }) => {

  const router = useRouter();

  
  const [currentPurchases, setCurrentPurchases] = useState<string>("All Purchases");

  const handlePayment = async (purchaseId: string) => {
    try {
      const response = await apiService.processPurchase(purchaseId);
      if (response?.sessionUrl) {
        // Safely access sessionUrl
        window.location.href = response.sessionUrl;
      } else {
        alert("Error al iniciar el proceso de pago. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("Hubo un problema al iniciar el proceso de pago.");
    }
  };

  const filteredPurchases = (): DetailedPurchase[] => {
    if (currentPurchases === "All Purchases") {
      return purchases;
    }
    return purchases.filter(
      (purchase) => purchase.status.toLowerCase() === currentPurchases?.toLowerCase(),
    );
  };

  const handleCreateProject = async (purchase: DetailedPurchase) => {
    try {
      const response = await apiService.createProject({
        purchaseId: purchase._id,
      });
  
      if (response.message === "Project created successfully.") {
        // Redirige a la URL con el panel correcto
        const newUrl = "/panel-client?panel=projects";
        router.push(newUrl);
  
        setTimeout(() => {
          window.history.replaceState(null, "", newUrl); // Asegura que la URL con panel=projects se mantenga
          window.location.reload();
        }, 100);
      } else {
        alert("Error al crear el proyecto. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("Hubo un problema al crear el proyecto");
    }
  };

  return (
    <section>
      <Section
        typePurchase={typePurchase}
        currentPurchases={currentPurchases}
        setCurrentPurchases={setCurrentPurchases}
        purchasesWithProject={purchasesWithProject}
        filteredPurchases={filteredPurchases}
        handlePayment={handlePayment}
        handleCreateProject={handleCreateProject}
      />
    </section>
  );
};
