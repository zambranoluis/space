import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(`${BACKEND_URL}/products`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;
      return NextResponse.json({ error: message }, { status });
    } else if (error instanceof Error) {
      // Handle generic errors
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Handle unexpected errors
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}