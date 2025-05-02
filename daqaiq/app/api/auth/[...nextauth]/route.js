import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../lib/models/User';
import { NextResponse } from 'next/server';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide all required fields');
        }

        try {
          await connectToDatabase();
          
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            throw new Error('No user found with this email');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Update last login time
          await User.findByIdAndUpdate(user._id, {
            lastLogin: new Date()
          });

          // Ensure roles is an array
          const roles = Array.isArray(user.roles) ? user.roles : [user.role || 'customer'];

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            roles: roles,
            status: user.status,
            image: user.avatar || null
          };
        } catch (error) {
          console.error('Auth Error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        token.status = user.status;
      }
      // Handle updates
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.status = token.status;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      const isSupplierDomain = baseUrl.includes('supplier.');
      
      // For supplier domain
      if (isSupplierDomain) {
        // Always redirect to /supplier for root or auth paths
        if (url === baseUrl || url.includes('/auth/')) {
          return `${baseUrl}/supplier`;
        }
        
        // For relative URLs
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`;
        }
        
        // For absolute URLs
        if (url.startsWith('http')) {
          const urlObj = new URL(url);
          if (urlObj.host === new URL(baseUrl).host) {
            return url;
          }
        }
        
        // Default to supplier dashboard
        return `${baseUrl}/supplier`;
      }

      // For non-supplier domains
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      
      // Allow same-origin URLs
      if (url.startsWith('http')) {
        const urlHost = new URL(url).host;
        const baseUrlHost = new URL(baseUrl).host;
        if (urlHost === baseUrlHost) {
          return url;
        }
      }

      return baseUrl;
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