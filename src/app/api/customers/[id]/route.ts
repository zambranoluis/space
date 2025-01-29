import axios from "axios";
import { CreateCustomer, CreatePurchase } from "@/services/apiService";

const apiUrl = "/api";

export const apiService = {
  createCustomer: async (customer: CreateCustomer): Promise<any> => {
    try {
      const response = await axios.post(`${apiUrl}/customers`, customer);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear el cliente:", error.response?.data || error.message);
      throw error;
    }
  },
  getCustomer: async (customerId: string): Promise<any> => {
    try {
      const response = await axios.get(`${apiUrl}/customers/${customerId}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al obtener el cliente:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },
  getProducts: async (): Promise<any> => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener productos:", error.response?.data || error.message);
      throw error;
    }
  },
  createPurchase: async (purchase: CreatePurchase): Promise<any> => {
    try {
      const response = await axios.post(`${apiUrl}/purchases`, purchase);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear la compra:", error.response?.data || error.message);
      throw error;
    }
  },
};
