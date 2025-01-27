"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


import { apiService } from "@/services/apiService";



const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string>("");
  const [transaction, setTransaction] = useState<any>(null);

  const fetchTransaction = async () => {
    try {
      const response = await apiService.getTransactionById(sessionId);
      console.log("Success: Transaction response:", response); // Log the API response
      if (response) {
        setTransaction(response.data);
        console.log("Success: Transaction data:", transaction); // Log the API response
      }
    } catch (err: unknown) {
      console.error("Success: Error fetching Transaction:", err);
    }
  };

  const updatePurchaseSuccess = async (transaction:string, status: string) => {
    try {
      const response = await apiService.updatePurchaseStatus(transaction, status);
      console.log("Success: Update response:", response); // Log the API response
      if (response) {
        console.log("Success: Update data:", transaction); // Log the API response
      }
    } catch (err: unknown) {
    }
  };

  useEffect(() => {
    const sessionIdFromQuery = searchParams.get('sessionId');
    if (sessionIdFromQuery) {
      setSessionId(sessionIdFromQuery);
    }

    if (sessionId) {
      fetchTransaction();
    }


  }, [searchParams, sessionId]);

  



  

  const handleSuccessPurchase = () => {
    console.log("Session ID:", sessionId);
    console.log("transaccion a evaluar:", transaction);
    

    if (sessionId && transaction !== null) {
      console.log("sessionID existe")
      updatePurchaseSuccess(transaction[0].purchase, "completed");
      
    }
    window.location.href = "/panel-client";
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-green-100'>
      <h1 className='text-4xl font-bold text-green-600'>Payment Successful!</h1>
      <p className='mt-4 text-lg'>
        Thank you for your purchase. Your order is now payed and soon to be assigned for development.
      </p>
      <button
        onClick={() => {handleSuccessPurchase()}}
        className='mt-6 px-4 py-2 bg-green-600 text-white rounded-md'>
        Go to Dashboard
      </button>
    </div>
  );

};

export default SuccessPage;
