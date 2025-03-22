import client from "@/pages/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ["omega6192000@gmail.com"];
const adminFunctionEmails = ["omega6192000@gmail.com"];

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(client),
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!adminEmails.includes(user.email)) {
        return false; // Prevents the sign-in process
      }
      return true;
    },
    session: ({ session, token, user }) => {
      // return session
      if (!adminEmails.includes(session?.user?.email)) {
        return null; // Prevents create session
      }
      return session;
    },
  },
});

export const IsAdminRequest = (email) => {
  return adminFunctionEmails.includes(email);
};
