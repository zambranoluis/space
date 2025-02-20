import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/services/apiService";
import { Image } from "@nextui-org/image";
import { FaTags } from "react-icons/fa6";
import Section from "./Section";
import Swal from "sweetalert2";

import { DetailedPurchase, GetProjectsByPurchasesId } from "@/utils/dataInterfaces";
import { set } from "date-fns";

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
  purchasesWithProject: string[];
  projects: GetProjectsByPurchasesId[];
  setProjects: React.Dispatch<React.SetStateAction<GetProjectsByPurchasesId[]>>;
}

export const Purchases: React.FC<PurchasesProps> = ({
  purchases,
  purchasesWithProject,
  projects,
  setProjects,
}) => {
  const router = useRouter();

  const [currentPurchases, setCurrentPurchases] = useState<string>("All Purchases");

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
      (purchase) => purchase.status.toLowerCase() === currentPurchases?.toLowerCase(),
    );
  };

  const handleCreateProject = async (purchase: DetailedPurchase) => {
    console.log("old projects variable: ", projects);
    console.log("---------------- creating project");

    try {
      const response = await apiService.createProject({
        purchaseId: purchase._id,
      });

      if (response.message === "Project created successfully.") {
        console.log("respuesta de la creación de proyecto: ", response);

        setProjects((prevProjects) => {
          const updatedProjects = [...prevProjects, response.projectPopulated];
          console.log("new projects variable: ", updatedProjects); // Aquí sí refleja el cambio
          return updatedProjects;
        });

        // Redirige a la URL con el panel correcto
        setTimeout(() => {
          const newUrl = "/panel-client?panel=projects";
          router.push(newUrl);
        }, 200);
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
