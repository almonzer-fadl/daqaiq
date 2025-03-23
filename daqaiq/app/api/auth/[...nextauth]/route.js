import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../lib/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text", default: "supplier" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide all required fields');
        }

        try {
          await connectToDatabase();
          
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            throw new Error('No user found with this email');
          }

          // Check if the user's role matches the requested role
          if (credentials.role && user.role !== credentials.role) {
            throw new Error(`Invalid ${credentials.role} credentials`);
          }

          // Remove verification check for suppliers
          // if (user.role === 'supplier' && !user.isVerified) {
          //   throw new Error('Please verify your email before signing in');
          // }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Update last login time
          await User.findByIdAndUpdate(user._id, {
            lastLogin: new Date()
          });

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.avatar || null,
            isVerified: user.isVerified,
          };
        } catch (error) {
          console.error('Auth Error:', error);
          throw new Error(error.message);
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin/supplier',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 