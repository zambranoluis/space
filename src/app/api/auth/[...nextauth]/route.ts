import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import md5 from "md5";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    token: string; // Token generado en el backend de Node (token.node)
    sessionId: string;
  }

  interface Session {
    user: {
      id: string;
      token: string;
      sessionId: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    token?: string;
    sessionId?: string;
  }
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        geolocation: { label: "Geolocation", type: "text" },
      },
      async authorize(credentials) {
        const { email, password, geolocation } = credentials as {
          email: string;
          password: string;
          geolocation: string;
        };

        const hashedPassword = md5(password);

        try {
          // Llamada al endpoint de autenticación del backend de Node, que genera el token y crea/actualiza la sesión
          const response = await axios.post(`${BACKEND_URL}/customers/login`, {
            email,
            password: hashedPassword,
            geolocation,
          });

          if (response.data?.message === "Authentication successful") {
            const { session } = response.data;
            // Retornamos los datos proporcionados por el backend, incluyendo el token generado (almacenado en session.token.node)
            return {
              id: session.customerId,
              token: session.token.node,
              sessionId: session._id,
            };
          }

          throw new Error("Invalid credentials");
        } catch (error: any) {
          console.error("Error in authorize:", error.message);
          throw new Error("Invalid login credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas de expiración
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.token = user.token; // Token generado por el backend y extraído de la respuesta
        token.sessionId = user.sessionId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId as string,
        token: token.token as string,
        sessionId: token.sessionId as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
