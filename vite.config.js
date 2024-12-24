import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'appTwo',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: [
        'react',
        'react-dom',
      ],
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: false // Disable preload for Webpack compatibility
    }
  },
  optimization: {
    minimize: true,
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all"
        },
      },
      chunks: 'all',
    },
  },
  preview: {
    host: "localhost",
    port: 3002,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
})
