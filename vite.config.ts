import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';
  const supabaseUrl = env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || env.VITE_SUPABASE_ANON_KEY || '';

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      })
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }]
    },
    server: {
      port: 3000,
      open: true
    },
    define: {
      __IS_DEV__: JSON.stringify(isDev),
      __SUPABASE_URL__: JSON.stringify(supabaseUrl),
      __SUPABASE_ANON_KEY__: JSON.stringify(supabaseAnonKey),
      __PROJECT__: JSON.stringify('frontend')
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
            'vendor-mantine': ['@mantine/core', '@mantine/hooks', '@mantine/form'],
            'vendor-i18n': [
              'i18next',
              'react-i18next',
              'i18next-browser-languagedetector',
              'i18next-http-backend'
            ],
            'vendor-tiptap': [
              '@tiptap/react',
              '@tiptap/starter-kit',
              '@tiptap/extension-link',
              '@mantine/tiptap'
            ]
          }
        }
      }
    }
  };
});
