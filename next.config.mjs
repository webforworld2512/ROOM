/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude trashit directory from webpack processing
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/**', '**/trashit/**'],
    };

    // Exclude trashit from module resolution
    config.resolve = {
      ...config.resolve,
      modules: config.resolve.modules.filter(
        (module) => !module.includes('trashit')
      ),
    };

    return config;
  },
};

export default nextConfig;
  