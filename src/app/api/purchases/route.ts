import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    // Extract the token from the NextAuth JWT
    const tokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = tokenData?.token;

    // Validate the token
    if (!nodeToken) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    const body = await req.json();
    const response = await axios.post(`${BACKEND_URL}/purchases`, body, {
      headers: {
        "Content-Type": "application/json",
        // Send the Node-generated token in the Authorization header
        Authorization: `Bearer ${nodeToken}`,
      },
      withCredentials: true,
    });
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