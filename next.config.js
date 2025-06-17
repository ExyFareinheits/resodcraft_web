/** @type {import('next').NextConfig} */
module.exports = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						// Додаємо 'unsafe-eval' для dev-режиму (Next.js HMR), але не для production!
						value:
							process.env.NODE_ENV === 'development'
								? "default-src 'self'; img-src *; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; object-src 'none';"
								: "default-src 'self'; img-src *; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none';",
					},
				],
			},
		];
	},
};