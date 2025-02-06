"use client";
import apiClient from "./apiClient";

const NEXT_URL_API = process.env.NEXT_PUBLIC_NEXT_API_URL;

interface Customer {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  };
  skype: string;
  address: string;
  birthdate: string;
}

export const apiService = {
  createCustomer: async (customer: Customer) => {
    try {
      const response = await apiClient.post(`${NEXT_URL_API}/customers`, customer);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear el cliente:", error.response?.data || error.message);
      throw error;
    }
  },

  getCustomer: async (customerId: string) => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/customers/${customerId}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al obtener el cliente:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  getProducts: async () => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/products`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener productos:", error.response?.data || error.message);
      throw error;
    }
  },

  getExtras: async () => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/extras`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener extras:", error.response?.data || error.message);
      throw error;
    }
  },

  createPurchase: async (purchase: string) => {
    try {
      const response = await apiClient.post(`${NEXT_URL_API}/purchases`, purchase);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear la compra:", error.response?.data || error.message);
      throw error;
    }
  },

  updatePurchaseStatus: async (purchaseId: string, status: string) => {
    try {
      const response = await apiClient.patch(`${NEXT_URL_API}/purchases/${purchaseId}`, {
        status,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al actualizar el estado de la compra:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  processPurchase: async (purchaseId: string) => {
    try {
      const response = await apiClient.post(`${NEXT_URL_API}/process-purchase`, {
        purchaseId,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al procesar la compra:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  getPurchasesByCustomerId: async (customerId: string) => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/purchases/customer/${customerId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al obtener compras por cliente:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  getTransactionByPurchaseId: async (transactionId: string) => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/transaction/${transactionId}`,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al obtener transacción:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  updateTransaction: async (transactionId: string, status: string) => {
    try {
      const response = await apiClient.patch(
        `${NEXT_URL_API}/transaction/${transactionId}`,
        { status },
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al actualizar la transacción:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  getTransactionById: async (sessionId: string) => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/transaction/${sessionId}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al obtener transacción por ID:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};
