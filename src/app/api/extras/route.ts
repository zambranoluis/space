import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(`${BACKEND_URL}/extras`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
