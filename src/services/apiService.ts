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
  };
  skype: string;
  address: string;
  birthdate: string;
}

export interface Product {
  _id: string;
  name: string;
  type: string;
  area: number;
  image: string;
  include: [];
  extra: [];
  cost: number;
  price: number;
  picture: string;
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
  };
  skype: string;
  address: string;
  birthdate: string;
}

interface SelectedCustomer {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: {
    areaCode: string;
    number: string;
  };
  address: string
}
export interface SelectedProduct {
  id: string;
  name: string;
  type: string;
  area: number;
  price: number;
  picture: string;
  include: [];
}

export interface SelectedExtra {
  extra: string;
  isActive: boolean;
}


interface Purchase {
  customer: string;
  product: string; 
  extras: {
    extra: string;
    isActive: boolean;
  }[];
  selectedAreas: { nameArea: string; isActive: boolean }[];
  status: string;
  total: number;
  isActive: boolean;
}

interface CreatePurchase {
  customer: string;
    product: string;
    selectedAreas: { nameArea: string; isActive: boolean }[],
    extras: SelectedExtra[];
    price: number;
    status: string;
    isActive: boolean;
}

const url = "http://localhost:4000/space";

export const apiService = {
  createCustomer: async (customer: CreateCustomer) => {
    try {
      const response = await axios.post(`${url}/customers`, customer, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("1. peticion axios createCustomer", response);
      if (response) {
        // console.log("2. respuesta peticion axios createCustomer", response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {}
  },
  getCustomer: async (customerId: string) => {
    try {
      const response = await axios.get(`${url}/customers/${customerId}`);
      if (response) {
        // console.log("peticion axios getCustomer", response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {}
  },
  getProducts: async () => {
    try {
      const response = await axios.get(`${url}/products`);
      if (response) {
        // console.log("peticion axios getProducts", response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error en la petición getProducts:", error);
    }
  },
  getExtras: async () => {
    try {
      const response = await axios.get(`${url}/extras`);
      if (response) {
        // console.log("peticion axios getExtras", response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error en la petición getExtras:", error);
    }
  },
  createPurchase: async (purchase: CreatePurchase) => {
    try {
      const response = await axios.post(`${url}/purchases`, purchase, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear la compra:", error);
    }
  },
  updatePurchaseStatus: async (purchase: string, status: string) => {
    try {
      const response = await axios.patch(`${url}/purchases/${purchase}`, { status }, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el estado de la compra:", error);
    }
  },
  processPurchase: async (purchaseId: string) => {
    try {
      const response = await axios.post(
        `${url}/process-purchase`,
        { purchaseId },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  },
  getPurchasesByCustomerId: async (customerId: string) => {
    try {
      const response = await axios.get(`${url}/purchases/customer/${customerId}`);
      if (response) {
        // console.log("peticion API axios getPurchasesByCustomer", response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      // console.log("Error en la petición getPurchasesByCustomerId:", error);
    }
  },
  getPurchasesByCustomerAndId: async (customerId: string) => {
    try {
      const response = await axios.get(
        `${url}/purchases/customer/${customerId}/purchase/679198fcdb75b57ef3541e4f`,
      );
      if (response) {
        // console.log("peticion API axios getPurchasesByCustomer", response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      // console.log("Error en la petición getPurchasesByCustomerId:", error);
    }
  },

  getTransactionById: async (transactionId: string) => {
    try {
      const response = await axios.get(`${url}/transactions/${transactionId}`);
      if (response) {
        // console.log("peticion API axios getTransactionById", response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      // console.log("Error en la petición getTransactionById:", error);
    }
  },
  updateTransaction: async (transactionId: string, status: string) => {
    try {
      const response = await axios.patch(
        `${url}/transactions/${transactionId}`,
        { status },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la transacción:", error);
    }
  },
};
