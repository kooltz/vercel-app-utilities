import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "user-credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const client = await MongoClient.connect(
          `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );

        const users = await client.db().collection("users");

        const user = await users.findOne({
          email: credentials.email,
        });

        if (!users) {
          // not found user
          client.close();
          return null;
        }

        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        console.log("checkPassword : ", checkPassword);

        if (!checkPassword) {
          // incorrect password
          client.close();
          return null;
        }

        return user;
      },
    }),
  ],
  secret: "test",
  pages: {
    //error: "/error",
    // signIn: "/login",
    signOut: "/",
  },
  session: {
    jwt: true,
    //strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  jwt: {
    secret: "test",
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      //console.log(`[Callbacks JWT] token => ${JSON.stringify(token)}`);
      //console.log(`[Callbacks JWT] user => ${JSON.stringify(user)}`);

      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      //console.log(`[Callbacks Session] session => ${JSON.stringify(session)}`);
      //console.log(`[Callbacks Session] token => ${JSON.stringify(token)}`);
      //console.log(`[Callbacks Session] user => ${JSON.stringify(user)}`);
      return session;
    },
    async redirect({ url, baseUrl }) {
      //   console.log(`[Callbacks redirect] url => ${url}`);
      //   console.log(`[Callbacks redirect] baseUrl => ${baseUrl}`);

      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return `${baseUrl}`;
      }
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
