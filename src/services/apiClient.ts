import axios from "axios";
import { getSession } from "next-auth/react";

// Lista de endpoints protegidos
const protectedEndpoints = [
  "/purchases",
  "/transaction",
  "/questionnaires",
  "/questions",
  "/projects",
  "/process-purchase",
];
const NEXT_URL_API = process.env.NEXT_PUBLIC_NEXT_API_URL;
const apiClient = axios.create({
  baseURL: NEXT_URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    // Si la URL es la de login, omitir la inyección del token.
    if (config.url?.includes("/customers/login")) {
      return config;
    }

    // Verificamos si la URL de la petición coincide con algún endpoint protegido
    const isProtected = protectedEndpoints.some((endpoint) =>
      config.url?.includes(endpoint),
    );

    if (isProtected) {
      // Obtenemos la sesión para extraer el token
      const session = await getSession();
      const token = session?.user?.token;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
