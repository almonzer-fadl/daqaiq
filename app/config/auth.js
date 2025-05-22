const authConfig = {
  supplier: {
    baseUrl: process.env.NEXT_PUBLIC_URL || 'https://daqaiq.com',
    loginPath: '/supplier/auth/signin',
    callbackUrl: '/supplier/dashboard',
    authApiPath: '/api/supplier/auth'
  },
  admin: {
    baseUrl: process.env.NEXT_PUBLIC_URL || 'https://daqaiq.com',
    loginPath: '/admin/auth/signin',
    callbackUrl: '/admin/dashboard',
    authApiPath: '/api/admin/auth'
  },
  customer: {
    baseUrl: process.env.NEXT_PUBLIC_URL || 'https://daqaiq.com',
    loginPath: '/auth/signin',
    callbackUrl: '/customer/dashboard',
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
    },
    async redirect({ url, baseUrl }) {
      // Handle path-based routing redirects
      if (url.startsWith('/supplier')) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith('/admin')) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith('/customer')) {
        return `${baseUrl}${url}`;
      }
      // Default redirect
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  secret: process.env.NEXTAUTH_SECRET
}; 