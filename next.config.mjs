/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kidsincompany-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '**/*',
      },
    ],
  },

  output: 'standalone',
}

export default nextConfig
