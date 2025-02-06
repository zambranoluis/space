import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: Obtener cliente por ID
export async function GET(req: NextRequest) {
  try {
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    // Extraer ID correctamente desde la URL
    const id = req.nextUrl.pathname.split("/").pop(); 

    if (!id) {
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const response = await axios.get(`${BACKEND_URL}/customers/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nodeToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error al obtener cliente:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Actualizar cliente por ID
export async function PATCH(req: NextRequest) {
  try {
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    // Extraer ID correctamente desde la URL
    const id = req.nextUrl.pathname.split("/").pop(); 

    if (!id) {
      return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
    }

    const body = await req.json();

    const response = await axios.patch(`${BACKEND_URL}/customers/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nodeToken}`,
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error al actualizar cliente:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
