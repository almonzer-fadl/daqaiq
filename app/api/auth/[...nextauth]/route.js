import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import Supplier from '@/models/Supplier';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          const supplier = await Supplier.findOne({ email: credentials.email });
          
          if (!supplier) {
            throw new Error('Invalid email or password');
          }

          const isValid = await bcrypt.compare(credentials.password, supplier.password);
          
          if (!isValid) {
            throw new Error('Invalid email or password');
          }

          // Update last login
          supplier.lastLoginAt = new Date();
          await supplier.save();

          return {
            id: supplier._id.toString(),
            email: supplier.email,
            role: supplier.role,
            companyName: supplier.companyName,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.companyName = user.companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.companyName = token.companyName;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 