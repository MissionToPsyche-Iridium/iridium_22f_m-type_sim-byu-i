import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
  base: '/iridium_22f_m-type_sim-byu-i/',
  plugins: [react(), glsl()],
});
