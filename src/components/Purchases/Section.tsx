"use client";

import { GiCheckMark } from "react-icons/gi";
import { PiTagSimpleFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import PurchaseDetails from "./PurchaseDetails";

import { Area, DetailedPurchase } from "@/utils/dataInterfaces";

interface SectionProps {
  typePurchase: { name: string; icon: React.ReactNode }[];
  currentPurchases: string;
  setCurrentPurchases: React.Dispatch<React.SetStateAction<string>>;
  purchasesWithProject: string[];
  filteredPurchases: () => DetailedPurchase[];
  handlePayment: (purchaseId: string) => void;
  handleCreateProject: (purchases: DetailedPurchase) => void;
}

const Section: React.FC<SectionProps> = ({
  typePurchase,
  currentPurchases,
  setCurrentPurchases,
  purchasesWithProject,
  filteredPurchases,
  handlePayment,
  handleCreateProject,
}) => {
  return (
    <div>
      <div className="flex flex-col w-[90%] h-full place-self-center gap-2 p-2">
        <div className="flex flex-col bgred-300 p-2">
          <div className="flex flex-col h-[80%] w-[90%] max-w-[405px] sticky top-2 p-2 bg-white place-self-center rounded-md  border border-[#6b776d] shadow-sm shadow-black">
            <div className="flex place-self-center bgpurple-300 borde-[#6b776d] borde-2 text-[#6b776d] rounded-md p2 w-[90%] h-[80px] overflow-x-scroll scrollbar-hide">
              {typePurchase.map((purchase, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center p-1 w-[100px]"
                >
                  <div
                    className={`w-full ${
                      currentPurchases === purchase.name
                        ? "border border-[#6b776d] rounded-md"
                        : ""
                    } text-xs flex flex-col text-center justify-center items-center p-2 cursor-pointer whitespace-nowrap`}
                    onClick={() => setCurrentPurchases(purchase.name)}
                  >
                    {purchase.icon}
                    {purchase.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center p-2 py6 items-center borderb borderb-[#6b776d] gap-2">
              <div className="flex w-full max-w-[400px]">
                <input
                  type="text"
                  placeholder="Search purchases"
                  className="w-full border border-[#6b776d] bg-white pl-2 text-[#6b776d] p-1 outline-none rounded-l-md border-r-0"
                />
                <div className="flex h-full p-2 justify-center items-center text-[#6b776d] hover:text-white rounded-r-md cursor-pointer hover:bg-[#6b776d] border border-[#6b776d]">
                  <FaSearch />
                </div>
              </div>
            </div>
          </div>

          <div className=" overflowy-scroll h-[90%] p-2 py-4 gap-2 w-full flex flex-col bgblue-300">
            {filteredPurchases().map(
              (purchase: DetailedPurchase, index: number) => (
                <div key={index} className="flex flex-col p-2 bgred-300 ">
                  <div
                    id="purchaseTitle"
                    className="flex max-sm:flex-col cursor-pointer items-center sm:gap-2 p-2 bg-[#6b776d] text-white justify-between border border-[#6b776d] rounded-t-md"
                    onClick={() =>
                      document
                        .getElementById(`purchase${index}`)
                        ?.classList.toggle("hidden")
                    }
                  >
                    <div className="flex max-sm:justify-center items-center">
                      <PiTagSimpleFill
                        className={`text-4xl pr-2 ${
                          purchase.status === "pending" ? "text-[#f5a524]" : ""
                        } ${
                          purchase.status === "completed"
                            ? "text-[#17c964]"
                            : ""
                        } ${
                          purchase.status === "canceled" ? "text-[#f31260]" : ""
                        }`}
                      />
                      <h1 className="text-xl sm:text-3xl font-black">
                        {purchase.product.name} {purchase.product.type}
                      </h1>
                    </div>
                    <div className="flex gap-1">
                      <p>Status:</p>
                      <p
                        className={`${
                          purchase.status === "pending" ? "text-[#f5a524]" : ""
                        } ${
                          purchase.status === "completed"
                            ? "text-[#17c964]"
                            : ""
                        } ${
                          purchase.status === "canceled" ? "text-[#f31260]" : ""
                        }`}
                      >
                        {purchase.status}
                      </p>
                    </div>
                  </div>
                  <div
                    id={`purchase${index}`}
                    className="hidden flex flex-col bg-gray-100 text-black p-4 border border-[#6b776d] rounded-b-md"
                  >
                    <div className="flex flex-col ">
                      <h2 className="font-bold text-xl">Package:</h2>
                      <p>
                        {purchase.product.name} {purchase.product.type}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-bold text-xl">Selected Areas:</h2>
                      {purchase.selectedAreas?.length > 0 ? (
                        purchase.selectedAreas.map(
                          (area: Area, i: number) =>
                            area.isActive && <p key={i}>{area.nameArea}</p>
                        )
                      ) : (
                        <p>No areas selected</p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-bold text-xl">Extras:</h2>
                      {purchase.extras.some((extra) => extra.isActive) ? (
                        purchase.extras.map((extra, index: number) =>
                          extra.isActive ? (
                            <p key={`extra-${index}`}>
                              <GiCheckMark className="inline-block text-green-600" />{" "}
                              {extra.extra?.name || "Unnamed Extra"}
                            </p>
                          ) : null
                        )
                      ) : (
                        <p>No extra selected</p>
                      )}
                    </div>

                    <div className="flex flex-col mt-4">
                      <h2 className="font-bold text-xl">
                        Price: ${purchase.total}
                      </h2>
                      <div className="flex gap-2">
                        {purchase.status === "pending" && (
                          <button
                            onClick={() => handlePayment(purchase._id)}
                            className="mt-2 px-3 py-2 bg-[#858e5b] text-white place-self-start rounded-tl-3xl rounded-br-3xl"
                          >
                            Process Payment
                          </button>
                        )}
                        {purchase.status === "completed" && (
                          <div className="flex gap-2">
                            <PurchaseDetails purchaseId={purchase._id} />
                          </div>
                        )}
                        {purchase.status === "completed" &&
                          purchase.inProject === false && (
                            <button
                              onClick={() => handleCreateProject(purchase)}
                              className="mt-2 px-3 py-2 bg-[#858e5b] text-white place-self-start rounded-tl-3xl rounded-br-3xl"
                            >
                              Create Project
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
