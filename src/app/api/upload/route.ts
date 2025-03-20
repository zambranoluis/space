import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    // Extraer token JWT de NextAuth
    const tokenData = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const nodeToken = tokenData?.token;

    // if (!nodeToken) {
    //   return NextResponse.json(
    //     { error: "Unauthorized: No token provided" },
    //     { status: 401 },
    //   );
    // }

    // Leer el `FormData` directamente
    const formData = await req.formData();

    // Hacer la solicitud al backend
    const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${nodeToken}`,
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error en subida de archivos:", error);
    return NextResponse.json(
      { error: "Error al subir archivos" },
      { status: 500 }
    );
  }
}
