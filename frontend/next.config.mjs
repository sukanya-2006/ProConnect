// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   reactStrictMode: true,
// };

// export default nextConfig;





// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
