"use client"

import { useEffect, useState } from "react";

import { FaFileInvoiceDollar } from "react-icons/fa";

import {apiService} from "@/services/apiService";

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/modal";

interface PurchaseDetailsProps {
  purchaseId: string;
}

interface PurchaseDetails {
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


const PurchaseDetails: React.FunctionComponent<PurchaseDetailsProps> = ({ purchaseId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);

  const fetchTransactionDetails = async () => {
    try {
      const response = await apiService.getTransactionByPurchaseId(purchaseId);
      if (response) {
        const transactionDetails = response.data;
        setPurchaseDetails(transactionDetails);
      }
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, []);




  const handleOpenPurchaseDetails = () => {
    onOpen();
  };

  return (
    <div className="">
      <div className="">
        <button
          onClick={() => {handleOpenPurchaseDetails()}}
          className='mt-2 bg-blue-600 text-white place-self-start rounded-md p-2'>
          <FaFileInvoiceDollar className='text-2xl' />
        </button>
      </div>
      <div className=" ">
        <Modal className="bg-white text-black" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() =>
                <>
                  <ModalHeader className="flex">Purchase Details</ModalHeader>
                  <ModalBody className="flex">
                    {
                      purchaseDetails && (
                        <div className="flex flex-col">
                          <p>Amount: {purchaseDetails.amount}</p>
                          <p>Currency: {purchaseDetails.currency}</p>
                          <p>Created At: {purchaseDetails.createdAt}</p>
                          <p>Updated At: {purchaseDetails.updatedAt}</p>
                        </div>
                      )
                    }
                  </ModalBody>
                </>
            }
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default PurchaseDetails;