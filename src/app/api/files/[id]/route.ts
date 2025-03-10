import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { getToken } from "next-auth/jwt";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const id = request.nextUrl.pathname.split("/").pop() || "";
  const url = `${BACKEND_URL}/files/${id}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
  };
  try {
    const response = await axios.get(url, config);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.response?.data || error.message },
        { status: error.response?.status || 500 },
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
