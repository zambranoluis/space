import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const response = await axios.get(`${BACKEND_URL}/purchases/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const body = await req.json();
    const response = await axios.patch(`${BACKEND_URL}/purchases/${id}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
