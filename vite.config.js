import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// Mendapatkan path sertifikat
const key = fs.readFileSync(path.resolve(__dirname, "certificates/key.pem"));
const cert = fs.readFileSync(path.resolve(__dirname, "certificates/cert.pem"));

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: key,
      cert: cert,
    },
    host: "0.0.0.0", // Dapat diubah sesuai kebutuhan
    port: 3912, // Port yang ingin Anda gunakan
  },
});
