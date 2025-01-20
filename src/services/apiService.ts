
"use client";
import axios from "axios";

interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  }[];
  skype: string;
  address: string;
  birthdate: string;
}

interface CreateCustomer {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: {
    areaCode: string;
    number: string;
  }[];
  skype: string;
  address: string;
  birthdate: string;
}


interface Purchase {
  customer: string;
  product: string;
  extras: [
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    },
    {
      extra: string;
      isActive: boolean;
    }
  ];
  status: string;
  isActive: boolean;

}

const url = "http://localhost:4000/space";
// const url = "https://715vq04v-4000.use2.devtunnels.ms/space"

export const apiService = {
  createCustomer: async (customer: CreateCustomer) => {
    const response = await axios.post(`${url}/customers`, customer);
    console.log("response peticion createCustomer", response);
    return response.data;
  },
  getCustomer: async (customerId: string) => {
    const response = await axios.get<Customer>(`${url}/customers/${customerId}`);
    console.log("response peticion getCustomer con ID", response);
    return response.data;
  },
  getProducts: async () => {
    try {
      const response = await axios.get(`${url}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Asegúrate de enviar credenciales si el servidor las requiere
      });
  
      console.log("response peticion getProducts", response);
      return response.data;
    } catch (error) {
      console.error("Error en la petición getProducts:", error);
      throw error;
    }
  },
  getExtras: async () => {
    const response = await axios.get(`${url}/extras`);
    console.log("response peticion getExtras", response);
    return response.data;
  },

  createPurchase: async (purchase: Purchase) => {
    const response = await axios.post(`${url}/purchases`, purchase);
    console.log("response peticion createPurchase", response);
    return response.data;
  },

};