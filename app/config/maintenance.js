export const MAINTENANCE_MODE = {
    enabled: process.env.MAINTENANCE_MODE === 'true' || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
    // Add allowed IPs or admin routes that can bypass maintenance mode
    allowedPaths: [
        '/maintenance',      // Allow maintenance page
        '/api/auth',         // Allow auth endpoints
        '/_next',           // Allow Next.js assets
        '/favicon.ico',     // Allow favicon
        '/api',             // Allow API endpoints
        '/images',          // Allow image assets
        '/assets',          // Allow static assets
        '/public',          // Allow public assets
    ],
    // Admin IPs that can bypass maintenance mode
    allowedIPs: process.env.ADMIN_IPS ? process.env.ADMIN_IPS.split(',') : [],
    // Check if user is authenticated as admin
    isAdminUser: (token) => {
        return token?.role === 'main-admin' || token?.role === 'supplier';
    }
}; 

// Debug log the maintenance mode configuration
console.log('Maintenance Mode Configuration:', {
    enabled: MAINTENANCE_MODE.enabled,
    env: process.env.MAINTENANCE_MODE,
    nextPublicEnv: process.env.NEXT_PUBLIC_MAINTENANCE_MODE
}); 