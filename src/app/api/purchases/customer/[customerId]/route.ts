import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const pathParts = req.nextUrl.pathname.split("/");
    const customerId = pathParts[pathParts.length - 1];

    // Extraemos el token generado en Node (almacenado en la sesión de NextAuth)
    const getTokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = getTokenData?.token;

    const response = await axios.get(`${BACKEND_URL}/purchases/customer/${customerId}`, {
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
