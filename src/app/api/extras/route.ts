import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(`${BACKEND_URL}/extras`);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Now TypeScript knows that `error` is of type `AxiosError`
      return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
    } else {
      // Handle other types of errors
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  }
}