import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "";
export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        const { name, email, picture, sub } = token;
        const resp = await fetch(`${serverURL}/api/user/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            picture,
            id: sub,
          }),
        });
        const result = await resp.json();
        if (result.status === "success")
          session.user = {
            name,
            email,
            image: picture,
          };
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
          },
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
