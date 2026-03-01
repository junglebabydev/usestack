import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        const adminEmail = "admin@example.com";
        const adminPassword = "admin123";

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "1",
            name: "Admin",
            email: credentials.email,
            role: "admin",
          };
        }

        // Check against Supabase users table
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) {
          throw new Error("No user found with this email");
        }

        // Compare password using bcrypt
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in — seed token from the authorized user object
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.email = user.email;
      }
      if (account) {
        token.provider = account.provider;
      }
      // Re-fetch role from DB on every token refresh so DB changes
      // (e.g. promoting an agent) take effect without requiring re-login.
      if (token.id && token.id !== "1") {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("id", token.id)
          .single();
        if (data?.role) token.role = data.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
