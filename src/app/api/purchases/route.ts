import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${BACKEND_URL}/purchases`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
