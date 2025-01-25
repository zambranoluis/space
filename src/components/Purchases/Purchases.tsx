import { useEffect, useState } from "react";
import { apiService } from "@/services/apiService";
import { GiCheckMark } from "react-icons/gi";
import { PiTagSimpleFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

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

export const Purchases: React.FC = () => {
  const [currentClients, setCurrentClients] = useState<string | null>("All Purchases");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoadingPurchase, setIsLoadingPurchase] = useState<boolean>(false);

  useEffect(() => {
    const getPurchasesByCustomer = async () => {
      setIsLoadingPurchase(true);
      try {
        const response = await apiService.getPurchasesByCustomerId(
          "675388347f312ad7cc0a2ba2",
        );
        if (response?.data) {
          console.log("Datos de las compras:", response.data);
          setPurchases(response.data);
        }
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      } finally {
        setIsLoadingPurchase(false);
      }
    };

    getPurchasesByCustomer();
  }, []);

  const handlePayment = async (purchaseId: string) => {
    try {
      const response = await apiService.processPurchase(purchaseId);
      if (response?.sessionUrl) {
        window.location.href = response.sessionUrl; // Redirige a la sesión de Stripe Checkout
      } else {
        alert("Error al iniciar el proceso de pago. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert("Hubo un problema al iniciar el proceso de pago.");
    }
  };

  return (
    <div className='flex flex-col w-[90%] h-full place-self-center gap-2'>
      <div className='flex place-self-center border-[#6b776d] border-2 text-[#6b776d] rounded-md p2 w-[90%] max-w-[505px] h-[80px] overflow-x-scroll scrollbar-hide'>
        {["All Purchases", "Pending", "Development", "Completed", "Canceled"].map(
          (status, index) => (
            <div key={index} className='flex justify-center items-center p-1 w-[100px]'>
              <p
                className={`w-full ${
                  currentClients === status ? "border border-[#6b776d] rounded-md" : ""
                } text-xs flex flex-col text-center justify-center items-center p-2 cursor-pointer whitespace-nowrap`}
                onClick={() => setCurrentClients(status)}>
                {status}
              </p>
            </div>
          ),
        )}
      </div>

      <div className='flex flex-col h-[80%] w-full place-self-center rounded-md border border-[#6b776d]'>
        <div className='w-full flex justify-center p-2 py6 items-center border-b border-b-[#6b776d] gap-2'>
          <div className='flex w-full max-w-[400px]'>
            <input
              type='text'
              placeholder='Search purchases'
              className='w-full border border-[#6b776d] bg-white pl-2 text-[#6b776d] p-1 outline-none rounded-l-md border-r-0'
            />
            <div className='flex h-full p-2 justify-center items-center text-[#6b776d] hover:text-white rounded-r-md cursor-pointer hover:bg-[#6b776d] border border-[#6b776d]'>
              <FaSearch />
            </div>
          </div>
        </div>

        <div className='grid overflow-y-scroll h-[90%] p-2 py-4 gap-6 w-full'>
          {purchases.map((purchase: Purchase, index: number) => (
            <div key={index} className='flex flex-col p-2'>
              <div
                className='flex items-center gap-2 p-2 bg-[#6b776d] text-white justify-between border border-[#6b776d] rounded-t-md'
                onClick={() =>
                  document.getElementById(`purchase${index}`)?.classList.toggle("hidden")
                }>
                <div className='flex items-center'>
                  <PiTagSimpleFill className='text-2xl pr-2 text-[#f5a524]' />
                  <h1 className='text-3xl font-black'>Project - #{index + 1}</h1>
                </div>
                <div className='flex gap-1'>
                  <p>Status:</p>
                  <p className='text-[#f5a524]'>{purchase.status}</p>
                </div>
              </div>
              <div
                id={`purchase${index}`}
                className='hidden flex flex-col bg-gray-100 text-black p-4 border border-[#6b776d]'>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-xl'>Package:</h2>
                  <p>
                    {purchase.product.name} {purchase.product.type}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-xl'>Selected Areas:</h2>
                  {purchase.selectedAreas?.length > 0 ? (
                    purchase.selectedAreas.map(
                      (area: Area, i: number) =>
                        area.isActive && <p key={i}>{area.nameArea}</p>,
                    )
                  ) : (
                    <p>No areas selected</p>
                  )}
                </div>
                <div className='flex flex-col'>
                  <h2 className='font-bold text-xl'>Extras:</h2>
                  {purchase.extras.map((extra: Extra, i: number) => (
                    <p key={i}>
                      <GiCheckMark className='inline-block text-green-600' />{" "}
                      {extra.extra.name}
                    </p>
                  ))}
                </div>
                <div className='flex flex-col mt-4'>
                  <h2 className='font-bold text-xl'>Price: ${purchase.total}</h2>
                  {purchase.status === "Pending" && (
                    <button
                      onClick={() => handlePayment(purchase._id)}
                      className='mt-2 px-3 py-2 bg-[#858e5b] text-white rounded-tl-3xl rounded-br-3xl'>
                      Process Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
