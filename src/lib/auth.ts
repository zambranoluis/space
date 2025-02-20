import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios"; // Import AxiosError

declare module "next-auth" {
  interface User {
    id: string;
    token: string; // Token generado en el backend
    sessionId: string;
  }
  interface Session {
    user: User;
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

        try {
          const response = await axios.post(
            `${BACKEND_URL}/customers/login`,
            { email, password, geolocation },
            { headers: { "Content-Type": "application/json" } },
          );

          if (response.data?.message === "Authentication successful") {
            const { session } = response.data;

            // Devolver un objeto de usuario con las propiedades personalizadas
            return {
              id: session.customerId,
              token: session.token.node,
              sessionId: session._id,
            };
          }

          throw new Error("Invalid credentials");
        } catch (error: unknown) {
          // Explicitly type the error as AxiosError
          if (error instanceof AxiosError) {
            console.log(
              "Error in authorize:",
              error.response?.data?.message || error.message,
            );
          } else if (error instanceof Error) {
            console.log("Error in authorize:", error.message);
          } else {
            console.log("Unknown error in authorize:", error);
          }
          throw new Error("Invalid login credentials");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.token = user.token;
        token.sessionId = user.sessionId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId!,
        token: token.token!,
        sessionId: token.sessionId!,
      };
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
};
