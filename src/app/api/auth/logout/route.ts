import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers"; // ✅ Corrección: Importación correcta de cookies()

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.sessionId) {
      console.error("❌ sessionId is missing in logout");
      return NextResponse.json({ error: "No active session found" }, { status: 401 });
    }

    const sessionId = session.user.sessionId;
    console.log("✅ sessionId:", sessionId);

    // 🔹 Llamar al backend para eliminar la sesión
    // ✅ 🔹 Obtener cookies correctamente (NO USAR `await cookies()`)
    const cookieStore = await cookies();

    // ✅ 🔹 Eliminar cookies de sesión de NextAuth
    cookieStore.delete("next-auth.session-token");
    cookieStore.delete("next-auth.callback-url");
    cookieStore.delete("next-auth.csrf-token");

    await axios.post(`${BACKEND_URL}/customers/logout/${sessionId}`);

    return NextResponse.json({ message: "Logout successful" });
  } catch (error: any) {
    console.error("❌ Error during logout:", error);
    return NextResponse.json(
      { error: "Failed to logout", details: error.message },
      { status: 500 },
    );
  }
}
