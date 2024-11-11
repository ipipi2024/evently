/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',  // Use a string for hostname
        port: ''
      },
    ]
  }
}

module.exports = nextConfig