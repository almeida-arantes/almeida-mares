import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: "staff" | "owner";
  }

  interface Session {
    user: DefaultSession["user"] & {
      role: "staff" | "owner";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "staff" | "owner";
  }
}
