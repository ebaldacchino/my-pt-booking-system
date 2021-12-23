// https://nextjs.org/docs/advanced-features/security-headers

// const securityHeaders = [
// 	{
// 		key: 'X-DNS-Prefetch-Control',
// 		value: 'on',
// 	},
// 	{
// 		key: 'Strict-Transport-Security',
// 		value: 'max-age=63072000; includeSubDomains; preload',
// 	},
// 	{
// 		key: 'X-XSS-Protection',
// 		value: '1; mode=block',
// 	},
// 	{
// 		key: 'X-Frame-Options',
// 		value: 'SAMEORIGIN',
// 	},
// 	{
// 		key: 'X-Content-Type-Options',
// 		value: 'nosniff',
// 	},
// 	{
// 		key: 'Referrer-Policy',
// 		value: 'origin-when-cross-origin',
// 	},
// 	{
// 		key: 'Content-Security-Policy',
// 		value: "default-src 'self'",
// 	},
// ];

module.exports = {
	reactStrictMode: true,
	images: {
		formats: ['image/avif', 'image/webp'],
	},
	// async Headers() {
	// 	return [
	// 		{
	// 			// Apply these headers to all routes in your application.
	// 			source: '/(.*)',
	// 			headers: securityHeaders,
	// 		},
	// 	];
	// },
};
