// Author: Kevant Patel
// Date: 2025-08-18
// Description: NextAuth API route for Google authentication

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      // Ensure user is in DB
      await dbConnect();
      if (!user?.email) return false;
      await User.findOneAndUpdate(
        { email: user.email },
        { $setOnInsert: { name: user.name, image: user.image } },
        { upsert: true, new: true }
      );
      return true;
    },
    async jwt({ token, user }) {
      // attach minimal info
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (token?.email) session.user.email = token.email;
      return session;
    }
  }
});

export default authHandler;