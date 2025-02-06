import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    // Extraemos el token del JWT de NextAuth (el token generado en Node se almacena en la propiedad "token")
    const tokenCookies = req.cookies.get("next-auth.session-token");
    const nodeToken = tokenCookies?.value;

    const body = await req.json();
    const response = await axios.post(`${BACKEND_URL}/process-purchase`, body, {
      headers: {
        "Content-Type": "application/json",
        // Se envía el token generado en Node en la cabecera
        Authorization: `Bearer ${nodeToken}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
