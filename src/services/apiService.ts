
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
    try {
      const response = await axios.post<CreateCustomer>(`${url}/customers`, customer);
      console.log("1. peticion axios createCustomer", response);
      if (response) {
        console.log("2. respuesta peticion axios createCustomer", response);
        return response.data;
      } else {
        return null
      }
    } catch (error) {
      
    }
  },
  getCustomer: async (customerId: string) => {
    try {
      const response = await axios.get<Customer>(`${url}/customers/${customerId}`);
      if (response) {
        console.log("peticion axios getCustomer", response);
        return response.data;
      } else {
        return null
      }
    } catch (error) {
      
    }
    
  },
  getProducts: async () => {
    try {
      const response = await axios.get(`${url}/products`);
      if (response) {
        console.log("peticion axios getProducts", response);
        return response.data;
      } else {
        return null
      }
    } catch (error) {
      // console.error("Error en la petición getProducts:", error);
      // throw error;
    }
  },
  getExtras: async () => {

    try {
      const response = await axios.get(`${url}/extras`);
      if (response) {
        console.log("peticion axios getExtras", response);
        return response.data;
      } else {
        return null
      }
    } catch (error) {
      
    }
  },
  createPurchase: async (purchase: Purchase) => {

    try {
      const response = await axios.post(`${url}/purchases`, purchase);
      if (response) {
        console.log("peticion axios createPurchase", response);
        return response.data;
      } else {
        return null
      }
    } catch (error) {
      
    }
  },

};