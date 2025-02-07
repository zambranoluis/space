import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const pathParts = req.nextUrl.pathname.split("/");
    const customerId = pathParts[pathParts.length - 1];

    // Validate customerId
    if (!customerId) {
      return NextResponse.json(
        { error: "Missing customerId in the URL path" },
        { status: 400 },
      );
    }

    // Extract the token generated in Node (stored in the NextAuth session)
    const getTokenData = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const nodeToken = getTokenData?.token;

    // Validate the token
    if (!nodeToken) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    }

    const response = await axios.get(`${BACKEND_URL}/purchases/customer/${customerId}`, {
      headers: {
        "Content-Type": "application/json",
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