import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    // Extraemos el token del JWT de NextAuth (el token generado en Node se almacena en la propiedad "token")
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    const body = await req.json();
    const response = await axios.post(`${BACKEND_URL}/process-purchase`, body, {
      headers: {
        "Content-Type": "application/json",
        // Se envía el token generado en Node en la cabecera
        Authorization: `Bearer ${nodeToken}`,
        withCredentials: true,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
