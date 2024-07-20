/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
				port: '',
				// pathname: '/account123/**',
			},
		],
	},
};

export default nextConfig;
