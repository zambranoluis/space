import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.sessionId) {
      console.error("❌ sessionId is missing in logout");
      return NextResponse.json({ error: "No active session found" }, { status: 401 });
    }

    const sessionId = session.user.sessionId;

    // Llamar al backend para eliminar la sesión
    await axios.post(`${BACKEND_URL}/customers/logout/${sessionId}`);

    // Crear una respuesta que también elimine las cookies en el cliente
    const response = NextResponse.json({ message: "Logout successful" });

    // Eliminar cookies en el cliente
    response.cookies.set("next-auth.session-token", "", {
      expires: new Date(0),
      path: "/",
    });
    response.cookies.set("next-auth.callback-url", "", {
      expires: new Date(0),
      path: "/",
    });
    response.cookies.set("next-auth.csrf-token", "", {
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "❌ Axios error during logout:",
        error.response?.data || error.message,
      );
      return NextResponse.json(
        { error: "Failed to logout", details: error.response?.data || error.message },
        { status: error.response?.status || 500 },
      );
    } else if (error instanceof Error) {
      console.error("❌ Error during logout:", error.message);
      return NextResponse.json(
        { error: "Failed to logout", details: error.message },
        { status: 500 },
      );
    } else {
      console.error("❌ Unknown error during logout");
      return NextResponse.json(
        { error: "Failed to logout", details: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
