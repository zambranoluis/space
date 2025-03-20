import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const customerId = req.nextUrl.searchParams.get("customerId");
    const purchaseId = req.nextUrl.searchParams.get("purchaseId");

    // Validate required query parameters
    if (!customerId || !purchaseId) {
      return NextResponse.json(
        { error: "Missing customerId or purchaseId in query parameters" },
        { status: 400 }
      );
    }

    // Extract the token from the session (the token generated in Node is stored in `token`)
    const getTokenData = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const nodeToken = getTokenData?.token;

    // Validate the token
    // if (!nodeToken) {
    //   return NextResponse.json(
    //     { error: "Unauthorized: No token provided" },
    //     { status: 401 }
    //   );
    // }

    const response = await axios.get(
      `${BACKEND_URL}/purchases/customer/${customerId}/purchase/${purchaseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${nodeToken}`,
        },
        withCredentials: true,
      }
    );
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
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
