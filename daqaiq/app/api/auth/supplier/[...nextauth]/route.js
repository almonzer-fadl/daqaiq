import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Supplier Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide all required fields');
        }

        try {
          await connectToDatabase();
          
          const user = await User.findOne({ 
            email: credentials.email,
            roles: 'supplier'
          });
          
          if (!user) {
            throw new Error('Invalid supplier credentials');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: 'supplier',
            status: user.status
          };
        } catch (error) {
          console.error('Supplier Auth Error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always use the full URL of the supplier subdomain
      const supplierBaseUrl = process.env.NEXT_PUBLIC_SUPPLIER_URL || 'https://supplier.daqaiq.com';
      
      // If it's a relative URL, make it absolute
      if (url.startsWith('/')) {
        return `${supplierBaseUrl}${url}`;
      }
      
      // If it's already an absolute URL to our supplier domain, use it
      if (url.startsWith(supplierBaseUrl)) {
        return url;
      }
      
      // Default to supplier dashboard
      return `${supplierBaseUrl}/supplier`;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 