import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const customerId = req.nextUrl.searchParams.get("customerId");
    const purchaseId = req.nextUrl.searchParams.get("purchaseId");

    // Extraemos el token de la sesión (el token generado en Node se encuentra en token)
    const getTokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = getTokenData?.token;

    const response = await axios.get(
      `${BACKEND_URL}/purchases/customer/${customerId}/purchase/${purchaseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${nodeToken}`,
          withCredentials: true,
        },
      },
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
