/* auth.ts - NextAuth.js configuration */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with actual authentication logic (e.g., fetch from backend)
        if (
          credentials?.email === "academian@gmail.com" &&
          credentials?.password === "Advanced3"
        ) {
          return {
            id: "1",
            name: "Moriaki Satoru",
            email: "academian@gmail.com",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to login page
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = { ...session.user, id: token.sub as string };
      return session;
    },
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
