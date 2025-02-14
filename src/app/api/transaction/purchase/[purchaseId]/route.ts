import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: Obtener transacción por ID de compra
export async function GET(req: NextRequest) {
  try {
    // Extraer el token de la sesión NextAuth (el token generado en Node se encuentra en token)
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    // Validar el token
    if (!nodeToken) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 },
      );
    }
    // Obtener el ID de la transacción desde la URL
    const pathParts = req.nextUrl.pathname.split("/");
    const purchaseId = pathParts[pathParts.length - 1];
    const response = await axios.get(
      `${BACKEND_URL}/transaction/purchase/${purchaseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${nodeToken}`,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.response?.data },
        { status: error.response?.status },
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
