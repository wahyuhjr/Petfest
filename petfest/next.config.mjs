/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Konfigurasi remote patterns jika diperlukan
    ],
    // Tambahkan konfigurasi untuk GIF
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    // Disable optimasi untuk GIF dengan pattern matching
    unoptimized: true, // Mengatur semua gambar agar tidak dioptimasi
  },
};

export default nextConfig;
