"use client";
import { get } from "http";
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
  createQuestionnaires,
  Project,
  createProject,
  GetProjectsByPurchasesId,
  question,
  Files,
} from "@/utils/dataInterfaces.js";

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
  createCustomer: async (
    customer: CreateCustomer
  ): Promise<ApiResponse<Customer>> => {
    try {
      const response = await apiClient.post(
        `${NEXT_URL_API}/customers`,
        customer
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al crear el cliente:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getCustomer: async (customerId: string): Promise<ApiResponse<Customer>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/customers/${customerId}`
      );
      return response;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener el cliente:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getProducts: async (): Promise<ApiResponse<Product[]>> => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/products`);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener productos:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getExtras: async (): Promise<ApiResponse<Extra[]>> => {
    try {
      const response = await apiClient.get(`${NEXT_URL_API}/extras`);
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener extras:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  createPurchase: async (
    purchase: CreatePurchase
  ): Promise<ApiResponse<CreatePurchase>> => {
    try {
      const response = await apiClient.post(
        `${NEXT_URL_API}/purchases`,
        purchase
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al crear la compra:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  updatePurchaseStatus: async (
    purchaseId: string,
    status: string
  ): Promise<ApiResponse<Purchase>> => {
    try {
      const response = await apiClient.patch(
        `${NEXT_URL_API}/purchases/${purchaseId}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al actualizar el estado de la compra:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  processPurchase: async (
    purchaseId: string
  ): Promise<ApiResponse<{ sessionUrl: string }>> => {
    try {
      const response = await apiClient.post(
        `${NEXT_URL_API}/process-purchase`,
        {
          purchaseId,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al procesar la compra:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getPurchasesByCustomerId: async (
    customerId: string
  ): Promise<ApiResponse<DetailedPurchase[]>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/purchases/customer/${customerId}`
      );
      return response.data; // Asegúrate de que este `response.data` sea un array de compras
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener compras por cliente:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getTransactionByTransactionId: async (
    transactionId: string
  ): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/transaction/purchase/${transactionId}`
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener transacción:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getTransactionByPurchaseId: async (
    purchaseId: string
  ): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/transaction/purchase/${purchaseId}`
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener transacción:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  updateTransaction: async (
    transactionId: string,
    status: string
  ): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await apiClient.patch(
        `${NEXT_URL_API}/transaction/${transactionId}`,
        { status }
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al actualizar la transacción:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getTransactionById: async (
    sessionId: string
  ): Promise<ApiResponse<Transaction>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/transaction/${sessionId}`
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener transacción por ID:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  createQuestionnaire: async (
    questionnaire: createQuestionnaires
  ): Promise<ApiResponse<createQuestionnaires>> => {
    try {
      const response = await apiClient.post(
        `${NEXT_URL_API}/questionnaires`,
        questionnaire
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al crear el cuestionario:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getQuestionnaireById: async (
    questionnaireId: string
  ): Promise<ApiResponse<createQuestionnaires>> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/questionnaires/${questionnaireId}`
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener cuestionario por ID:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  updateQuestionnaire: async (
    questionnaireId: string,
    status: string
  ): Promise<ApiResponse<createQuestionnaires>> => {
    try {
      const response = await apiClient.patch(
        `${NEXT_URL_API}/questionnaires/${questionnaireId}`,
        { status }
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al actualizar el cuestionario:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  createProject: async (
    project: createProject
  ): Promise<ApiResponse<createProject>> => {
    try {
      const response = await apiClient.post(
        `${NEXT_URL_API}/projects`,
        project
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al crear el proyecto:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getProjectById: async (projectId: string): Promise<Project> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/projects/${projectId}`
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al obtener el proyecto:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  updateProject: async (
    projectId: string,
    status: string
  ): Promise<ApiResponse<createProject>> => {
    try {
      const response = await apiClient.patch(
        `${NEXT_URL_API}/projects/${projectId}`,
        {
          status,
        }
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al actualizar el proyecto:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  getProjectByPurchasesId: async (
    purchaseId: string
  ): Promise<GetProjectsByPurchasesId> => {
    try {
      const response = await apiClient.get(
        `${NEXT_URL_API}/projects/purchase/${purchaseId}`
      );
      return response.data as GetProjectsByPurchasesId; // Asegura que TS entienda el tipo
    } catch (error) {
      throw error;
    }
  },

  createQuestion: async (
    question: question
  ): Promise<ApiResponse<question>> => {
    try {
      const response = await apiClient.post(
        `${NEXT_URL_API}/questions`,
        question
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al crear la pregunta:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  updateQuestion: async (
    questionId: string | undefined,
    question: question
  ): Promise<ApiResponse<question>> => {
    console.log("pregunta a actualizar: ", questionId);
    try {
      const response = await apiClient.patch(
        `${NEXT_URL_API}/questions/${questionId}`,
        question
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      console.log(
        "Error al actualizar la pregunta:",
        err.response?.data || err.message
      );
      throw error;
    }
  },

  uploadFiles: async (files: FormData): Promise<FormData> => {
    try {
      // const formData = new FormData();

      // files.forEach((file) => {
      //   formData.append("project", file.project);
      //   formData.append("files", file.files);
      // });

      const response = await apiClient.post<FormData>(
        `${NEXT_URL_API}/upload`,
        files,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al subir archivos:", error);
      throw error;
    }
  },
};
