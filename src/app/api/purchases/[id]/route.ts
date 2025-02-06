import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: Obtener compra por ID
export async function GET(req: NextRequest) {
  try {
    // Extraemos el token de la sesión de NextAuth (el token generado en Node se encuentra en token)
    const tokenCookies = req.cookies.get("next-auth.session-token");
    const nodeToken = tokenCookies?.value;

    const id = req.nextUrl.searchParams.get("id");
    const response = await axios.get(`${BACKEND_URL}/purchases/${id}`, {
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

// PATCH: Actualizar compra por ID
export async function PATCH(req: NextRequest) {
  try {
    // Extraemos el token generado en Node desde la sesión NextAuth
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    const id = req.nextUrl.searchParams.get("id");
    const body = await req.json();
    const response = await axios.patch(`${BACKEND_URL}/purchases/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nodeToken}`,
        withCredentials: true,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
