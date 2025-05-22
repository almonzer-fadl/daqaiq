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
      // Get the intended URL from the callback parameter
      const callbackUrl = new URL(url, baseUrl).searchParams.get('callbackUrl');
      
      // If there's a callback URL and it's for our domain, use it
      if (callbackUrl && callbackUrl.startsWith('/')) {
        // Check role-specific paths
        if (callbackUrl.startsWith('/supplier/') && token?.role !== 'supplier') {
          return '/supplier/auth/signin';
        }
        if (callbackUrl.startsWith('/admin/') && token?.role !== 'main-admin') {
          return '/admin/auth/signin';
        }
        if (callbackUrl.startsWith('/customer/') && token?.role !== 'customer') {
          return '/auth/signin';
        }
        return callbackUrl;
      }

      // Default redirects based on role
      if (token?.role === 'supplier') {
        return '/supplier/dashboard';
      }
      if (token?.role === 'main-admin') {
        return '/admin/dashboard';
      }
      if (token?.role === 'customer') {
        return '/customer/dashboard';
      }

      // If no specific redirect is determined, stay on current URL
      return url;
    }
  },
  pages: {
    signIn: (request) => {
      if (!request) return '/auth/signin';
      
      const path = request.url || '';
      if (path.includes('/supplier/')) {
        return '/supplier/auth/signin';
      }
      if (path.includes('/admin/')) {
        return '/admin/auth/signin';
      }
      return '/auth/signin';
    },
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  secret: process.env.NEXTAUTH_SECRET
}; 