import { getServerSession } from 'next-auth/next';
import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { type JWT } from 'next-auth/jwt';
import jsonwt from 'jsonwebtoken';
import { createUser, getUser } from '../database';
import { type IResponse, type ISessionInterface } from '../interfaces';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwt.sign(
        {
          ...token,
          iss: 'grafbase',
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwt.verify(token ?? '', secret);
      return decodedToken as JWT;
    }
  },
  theme: { colorScheme: 'light', logo: '/images/logo.svg' },
  callbacks: {
    async session({ session }) {
      const email = session.user?.email;
      const { data } = await getUser(email ?? '');
      if (!data?.user) return session;
      const newSession = { ...session, user: { ...session.user, ...data.user } };
      return newSession;
    },
    async signIn({ user }) {
      const { email, image, name } = user;
      try {
        if (!email || !image || !name) return false;
        const { data } = await getUser(email);
        if (!data?.user) {
          await createUser(name, email, image);
        }
        return true;
      } catch (error: any) {
        console.error(`SESSION: ${error.message}`);
        return false;
      }
    }
  }
};

export async function getCurrentUser(): Promise<IResponse<ISessionInterface | null>> {
  try {
    const session = (await getServerSession(authOptions)) as ISessionInterface;
    return {
      data: session,
      error: null
    };
  } catch (error: any) {
    console.error(`SESSION: ${error.message}`);
    return {
      data: null,
      error: 'Something went wrong!'
    };
  }
}
