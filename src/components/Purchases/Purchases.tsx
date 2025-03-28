import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/apiService";
import { Image } from "@heroui/image";
import { FaTags } from "react-icons/fa6";
import Section from "./Section";
import Swal from "sweetalert2";

import {
  DetailedPurchase,
  GetProjectsByPurchasesId,
} from "@/utils/dataInterfaces";
import { set } from "date-fns";

const typePurchase = [
  {
    name: "All Purchases",
    icon: <FaTags className="text-2xl" />,
  },
  {
    name: "Pending",
    icon: (
      <Image
        src={
          "https://github.com/BPM94/SCCTMD/raw/main/purchases/purchasePendingSpaceColorsGreen.png"
        }
        className="w-[25px] h-[25px] rounded-none"
        alt=""
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
        className="w-[25px] h-[25px] rounded-none"
        alt=""
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
        className="w-[25px] h-[25px] rounded-none"
        alt=""
      />
    ),
  },
];

interface PurchasesProps {
  purchases: DetailedPurchase[];
  purchasesWithProject: string[];
  projects: GetProjectsByPurchasesId[];
  setProjects: React.Dispatch<React.SetStateAction<GetProjectsByPurchasesId[]>>;
}

const Purchases: React.FC<PurchasesProps> = ({
  purchases,
  purchasesWithProject,
  projects,
  setProjects,
}) => {
  const router = useRouter();

  const [currentPurchases, setCurrentPurchases] =
    useState<string>("All Purchases");

  const handlePayment = async (purchaseId: string) => {
    try {
      const response = await apiService.processPurchase(purchaseId);
      if (response?.sessionUrl) {
        // Safely access sessionUrl
        Swal.fire({
          title: "Payment process started",
          icon: "success",
        });
        window.location.href = response.sessionUrl;
      } else {
        Swal.fire({
          title: "Error to start the payment process",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error to start the payment process",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const filteredPurchases = (): DetailedPurchase[] => {
    if (currentPurchases === "All Purchases") {
      return purchases;
    }
    return purchases.filter(
      (purchase) =>
        purchase.status.toLowerCase() === currentPurchases?.toLowerCase()
    );
  };

  const handleCreateProject = async (purchase: DetailedPurchase) => {
    try {
      const response = await apiService.createProject({
        purchaseId: purchase._id,
      });

      if (response.message === "Project created successfully.") {
        console.log("response de createProject: ", response);
        setProjects((prevProjects) => {
          const updatedProjects = [...prevProjects, response.project];
          return updatedProjects;
        });
        // Redirige a la URL con el panel correcto
        setTimeout(() => {
          const newUrl = "/panel-client?panel=projects";
          router.push(newUrl);
        }, 300);
      } else {
        Swal.fire({
          title: "Error to create the project",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error to create the project",
        icon: "error",
        confirmButtonText: "Close",
      });
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

export default Purchases;
