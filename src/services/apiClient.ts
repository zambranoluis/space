import axios from "axios";
import { getSession } from "next-auth/react";

// Lista de endpoints protegidos (puedes ajustar esta lista o usar expresiones regulares según lo necesites)
const protectedEndpoints = [
  "/customers",
  "/purchases",
  "/transaction",
  "/questionnaires",
  "/questions",
  "/process-purchase",
];

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXT_API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
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
