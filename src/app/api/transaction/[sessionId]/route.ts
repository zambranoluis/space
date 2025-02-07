import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: Obtener transacción por ID
export async function GET(req: NextRequest) {
  try {
    // Obtener el ID de la transacción desde la URL
    const pathParts = req.nextUrl.pathname.split("/");
    const id = pathParts[pathParts.length - 1];

    // Validar el ID
    if (!id) {
      return NextResponse.json(
        { error: "Missing transaction ID in the URL path" },
        { status: 400 },
      );
    }

    // Extraer el token de la sesión NextAuth (el token generado en Node se encuentra en token)
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    // Validar el token
    if (!nodeToken) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    const response = await axios.get(`${BACKEND_URL}/transaction/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nodeToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Manejar errores específicos de Axios
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;
      return NextResponse.json({ error: message }, { status });
    } else if (error instanceof Error) {
      // Manejar errores genéricos
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Manejar errores inesperados
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}

// PATCH: Actualizar transacción por ID
export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    // Validar el ID
    if (!id) {
      return NextResponse.json(
        { error: "Missing transaction ID in query parameters" },
        { status: 400 },
      );
    }

    // Extraer el token de la sesión NextAuth
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    // Validar el token
    if (!nodeToken) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    const body = await req.json();
    const response = await axios.patch(`${BACKEND_URL}/transactions/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nodeToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Manejar errores específicos de Axios
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;
      return NextResponse.json({ error: message }, { status });
    } else if (error instanceof Error) {
      // Manejar errores genéricos
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Manejar errores inesperados
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}