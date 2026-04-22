import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {
  findOwnerProfile,
  isStaffEmail,
  staffDisplayName,
} from "@/lib/auth-login";
import { isAuthDevBypass } from "@/lib/dev-auth-bypass";

function getLoginCode(): string | undefined {
  const v = process.env.AUTH_LOGIN_CODE?.trim();
  if (v) return v;
  if (process.env.NODE_ENV === "development") return "demo";
  return undefined;
}

const authSecret =
  process.env.AUTH_SECRET ||
  (process.env.NODE_ENV === "development"
    ? "development-only-auth-secret-min-32-chars!"
    : undefined);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  trustHost: true,
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        code: { label: "Código", type: "password" },
        role: { label: "Perfil", type: "text" },
      },
      authorize: async (credentials) => {
        const email = typeof credentials?.email === "string" ? credentials.email.trim() : "";
        const code = typeof credentials?.code === "string" ? credentials.code : "";
        const role =
          credentials?.role === "owner" || credentials?.role === "staff"
            ? credentials.role
            : null;

        if (isAuthDevBypass() && role) {
          if (role === "staff") {
            const em = (email || "dev@almeidamares.com.br").toLowerCase();
            return {
              id: "dev_staff",
              email: em,
              name: email ? staffDisplayName(email) : "Desenvolvedor",
              role: "staff" as const,
            };
          }
          const em = (email || "dev-owner@test").toLowerCase();
          const owner = email ? findOwnerProfile(email) : null;
          return {
            id: owner?.id ?? "dev_owner",
            email: owner?.email ?? em,
            name: owner?.name ?? "Proprietário (dev)",
            role: "owner" as const,
          };
        }

        if (!email || !code || !role) return null;

        const expected = getLoginCode();
        if (!expected || code !== expected) return null;

        if (role === "staff") {
          if (!isStaffEmail(email)) return null;
          return {
            id: `staff_${email}`,
            email: email.toLowerCase(),
            name: staffDisplayName(email),
            role: "staff" as const,
          };
        }

        const owner = findOwnerProfile(email);
        if (!owner) return null;
        return {
          id: owner.id,
          email: owner.email,
          name: owner.name,
          role: "owner" as const,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.role === "staff" || token.role === "owner") {
          session.user.role = token.role;
        }
        if (token.name) session.user.name = token.name as string;
        if (token.email) session.user.email = token.email as string;
      }
      return session;
    },
  },
});
