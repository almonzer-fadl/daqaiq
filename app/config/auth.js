const authConfig = {
  supplier: {
    baseUrl: process.env.NEXT_PUBLIC_SUPPLIER_URL || 'https://supplier.daqaiq.com',
    loginPath: '/auth/login',
    callbackUrl: '/supplier',
    authApiPath: '/api/supplier-auth'
  },
  admin: {
    baseUrl: process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.daqaiq.com',
    loginPath: '/auth/login',
    callbackUrl: '/admin',
    authApiPath: '/api/admin-auth'
  },
  customer: {
    baseUrl: process.env.NEXT_PUBLIC_URL || 'https://daqaiq.com',
    loginPath: '/auth/login',
    callbackUrl: '/',
    authApiPath: '/api/auth'
  }
};

export default authConfig;

export const authOptions = {
  providers: [
    CredentialsProvider({
      // ... your existing provider config
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET
}; 