import { useEffect, useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { apiService } from "@/services/apiService";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";

interface PurchaseDetailsProps {
  purchaseId: string;
}

interface PurchaseDetails {
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const PurchaseDetails: React.FunctionComponent<PurchaseDetailsProps> = ({ purchaseId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await apiService.getTransactionByPurchaseId(purchaseId);
        if (response.data) {
          console.log("response data purchase: ", response.data)
          const transaction = response.data; // Tipo Transaction
          
          // Convertimos Transaction a PurchaseDetails
          const details: PurchaseDetails = {
            amount: transaction.amount, // Convertir a string si es necesario
            currency: "USD", // Ajusta la moneda si no está en la respuesta
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
          };

          setPurchaseDetails(details);
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      }
    };

    fetchTransactionDetails();
  }, [purchaseId]);

  const handleOpenPurchaseDetails = () => {
    console.log("purchase ID to show : ", purchaseId);
    onOpen();
  };

  return (
    <div>
      <button
        onClick={handleOpenPurchaseDetails}
        className="mt-2 bg-blue-600 text-white rounded-md p-2"
      >
        <FaFileInvoiceDollar className="text-2xl" />
      </button>

      <Modal className="bg-white text-black" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex">Purchase Details</ModalHeader>
              <ModalBody className="flex">
                {purchaseDetails ? (
                  <div className="flex flex-col">
                    <p>Amount: {purchaseDetails.amount}</p>
                    <p>Currency: {purchaseDetails.currency}</p>
                    <p>Created At: {purchaseDetails.createdAt}</p>
                    <p>Updated At: {purchaseDetails.updatedAt}</p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PurchaseDetails;
