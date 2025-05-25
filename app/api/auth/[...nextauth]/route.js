import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('البريد الإلكتروني وكلمة المرور مطلوبة');
        }

        try {
          await dbConnect();

          // Find user by email
          const user = await User.findOne({ 
            email: credentials.email,
            roles: { $in: ['supplier'] } 
          });
          
          if (!user) {
            console.log('User not found:', credentials.email);
            throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
          }

          // Compare password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            console.log('Invalid password for user:', credentials.email);
            throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
          }

          console.log('Login successful for user:', credentials.email);

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: 'supplier',
            businessName: user.businessName,
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
        token.businessName = user.businessName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.businessName = token.businessName;
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