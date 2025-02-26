/** @type {import('next').NextConfig} */
/** @type {import('Config').tailwindcss} */


const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

// Helper function to merge configurations
function mergeConfig(baseConfig, userConfig) {
  if (!userConfig) {
    return baseConfig;
  }

  const merged = { ...baseConfig };
  for (const key in userConfig) {
    if (typeof merged[key] === 'object' && !Array.isArray(merged[key])) {
      merged[key] = {
        ...merged[key],
        ...userConfig[key],
      }
    } else {
      merged[key] = userConfig[key]
    }
  }
  return merged;
}

// Load user config if exists
let finalConfig = nextConfig;
try {
  const userConfig = Config();
  finalConfig = mergeConfig(nextConfig, userConfig);
} catch (e) {
  console.error(e);
  // ignore error if user config doesn't exist
}

module.exports = finalConfig;
