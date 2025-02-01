import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// GET: Obtener cliente por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const response = await axios.get(`${BACKEND_URL}/customers/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error al obtener cliente:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Actualizar cliente por ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();
    const response = await axios.patch(`${BACKEND_URL}/customers/${id}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error al actualizar cliente:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
