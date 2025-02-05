"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiService } from "@/services/apiService";

const SuccessContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchTransaction = async () => {
    if (!sessionId) return;

    try {
      const response = await apiService.getTransactionById(sessionId);
      if (response && response.data.length > 0) {
        const transaction = response.data[0];
        if (transaction.status === "created") {
          setTransaction(transaction);
        } else {
          setError("Payment not yet verified. Please refresh after a moment.");
        }
      } else {
        setError("Transaction not found.");
      }
    } catch (err) {
      console.error("Error fetching transaction:", err);
      setError("Failed to fetch transaction.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sessionIdFromQuery = searchParams.get("sessionId");
    if (sessionIdFromQuery) {
      setSessionId(sessionIdFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (sessionId) {
      fetchTransaction();
    }
  }, [sessionId]);

  const handleGoToDashboard = () => {
    router.push("/panel-client?panel=purchases");
  };

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-2xl'>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-red-100'>
        <h1 className='text-2xl text-red-600'>Error</h1>
        <p className='mt-4'>{error}</p>
      </div>
    );
  }

  if (transaction && transaction.status === "created") {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-green-100'>
        <h1 className='text-4xl font-bold text-green-600'>Payment Successful!</h1>
        <p className='mt-4 text-lg'>
          Thank you for your purchase. Your order is now paid and will soon be processed.
        </p>
        <button
          onClick={handleGoToDashboard}
          className='mt-6 px-4 py-2 bg-green-600 text-white rounded-md'>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-green-100'>
      <h1 className='text-4xl font-bold text-green-600'>Payment Successful!</h1>
      <p className='mt-4 text-lg'>
        Thank you for your purchase. Your order is now paid and will soon be processed.
      </p>
      <button
        onClick={handleGoToDashboard}
        className='mt-6 px-4 py-2 bg-green-600 text-white rounded-md'>
        Go to Dashboard
      </button>
    </div>
  );
};

const SuccessPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
          <h1 className='text-2xl'>Loading...</h1>
        </div>
      }>
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage;
