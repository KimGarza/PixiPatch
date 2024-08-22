// metro.config.js
module.exports = {
    transformer: {
      // Enable inline requires for faster startup times
      inlineRequires: true,
    },
    resolver: {
      // Add additional file extensions to be resolved by Metro
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'], // Add more if needed
    },
    watchFolders: [
      // Add additional directories to be watched by Metro
      // This is useful if you are working with a monorepo or custom packages
      // Example: path.resolve(__dirname, 'packages'),
    ],
  };
  