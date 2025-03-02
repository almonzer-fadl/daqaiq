import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;
          
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) return null;
          
          return user;
        } catch (error) {
          console.error('Auth Error:', error);
          return null;
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  }
});

export { handler as GET, handler as POST };