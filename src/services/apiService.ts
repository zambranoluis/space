"use client";
import apiClient from "./apiClient";

const NEXT_URL_API = process.env.NEXT_PUBLIC_NEXT_API_URL;

import {
  CreateCustomer,
  Customer,
  Extra,
  Product,
  CreatePurchase,
  Purchase,
  DetailedPurchase,
  Transaction,
} from "@/utils/dataTypes";


interface ApiResponse<T = unknown> {
  data: T;
  message?: string; // Agregamos 'message' como opcional
  sessionUrl?: string;
}

interface ApiError {
  response?: {
    data: {
      message?: string;
      error?: string;
      statusCode?: number;
    };
  };
  message: string;
}

export const apiService = {
  createCustomer: async (customer: CreateCustomer): Promise<ApiResponse<Customer>> => {
    try {
      const response = await apiClient.post(`${NEXT_URL_API}/customers`, customer);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al crear el cliente:", err.response?.data || err.message);
      throw error;
    }
  },

  getCustomer: async (customerId: string): Promise<ApiResponse<Customer>> => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/customers/${customerId}`);
      return response;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al obtener el cliente:", err.response?.data || err.message);
      throw error;
    }
  },

  getProducts: async (): Promise<ApiResponse<Product[]>> => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/products`);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al obtener productos:", err.response?.data || err.message);
      throw error;
    }
  },

  getExtras: async (): Promise<ApiResponse<Extra[]>> => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/extras`);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al obtener extras:", err.response?.data || err.message);
      throw error;
    }
  },

  createPurchase: async (purchase: CreatePurchase): Promise<ApiResponse<CreatePurchase>> => {
    try {
      const response = await apiClient.post(`${NEXT_URL_API}/purchases`, purchase);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al crear la compra:", err.response?.data || err.message);
      throw error;
    }
  },

  updatePurchaseStatus: async (purchaseId: string, status: string): Promise<ApiResponse<Purchase>> => {
    try {
      const response = await apiClient.patch(`${NEXT_URL_API}/purchases/${purchaseId}`, {
        status,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al actualizar el estado de la compra:", err.response?.data || err.message);
      throw error;
    }
  },

  processPurchase: async (purchaseId: string): Promise<ApiResponse<{ sessionUrl: string }>> => {
    try {
      const response = await apiClient.post(`${NEXT_URL_API}/process-purchase`, {
        purchaseId,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al procesar la compra:", err.response?.data || err.message);
      throw error;
    }
  },

  getPurchasesByCustomerId: async (customerId: string): Promise<ApiResponse<DetailedPurchase[]>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/purchases/customer/${customerId}`,
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al obtener compras por cliente:", err.response?.data || err.message);
      throw error;
    }
  },

  getTransactionByPurchaseId: async (transactionId: string): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/transaction/${transactionId}`,
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al obtener transacción:", err.response?.data || err.message);
      throw error;
    }
  },

  updateTransaction: async (transactionId: string, status: string): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await apiClient.patch(
        `${NEXT_URL_API}/transaction/${transactionId}`,
        { status },
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al actualizar la transacción:", err.response?.data || err.message);
      throw error;
    }
  },

  getTransactionById: async (sessionId: string): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/transaction/${sessionId}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error("Error al obtener transacción por ID:", err.response?.data || err.message);
      throw error;
    }
  },
};