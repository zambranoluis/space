
"use client";
import axios from "axios";

interface Customer {
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

// const url = "http://localhost:4000/space";
const url = "https://715vq04v-4000.use2.devtunnels.ms/space"

export const apiService = {
  createCustomer: async (customer: Customer) => {
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
    const response = await axios.get(`${url}/products`);
    console.log("response peticion getProducts", response);
    return response.data;
  },
  getExtras: async () => {
    const response = await axios.get(`${url}/extras`);
    console.log("response peticion getExtras", response);
    return response.data;
  },

};