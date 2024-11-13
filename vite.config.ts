import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from "vite-plugin-dts";
import preserveDirectives from "rollup-preserve-directives";

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    })    
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: '@jjspscl/react-onedrive',
      fileName: (format) => `react-onedrive.${format}.js`
    },
    rollupOptions: {
      external: [
        'react', 
        'react-dom',
        'react/jsx-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        },
      },
      plugins: [
        preserveDirectives()
      ]
    }
  }
});
