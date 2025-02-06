import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    // Obtener el ID de la transacció

    const pathParts = req.nextUrl.pathname.split("/");
    const id = pathParts[pathParts.length - 1];
    // Extraer el token de la sesión NextAuth (el token generado en Node se encuentra en token)
    const tokenCookies = req.cookies.get("next-auth.session-token");
    const nodeToken = tokenCookies?.value;

    const response = await axios.get(`${BACKEND_URL}/transaction/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nodeToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    // Extraer el token de la sesión NextAuth
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    const body = await req.json();
    const response = await axios.patch(`${BACKEND_URL}/transactions/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nodeToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
