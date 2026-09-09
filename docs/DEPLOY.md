# Deploy — cutover PM2 → Caddy static

Situs v4 sepenuhnya static (`adapter-static`). Runtime Node + PM2 tidak
diperlukan lagi. Workflow `deploy.yml` sudah dirombak: job `quality`
(GitHub-hosted) menjalankan seluruh gate lalu meng-upload `build/`;
job `deploy` (self-hosted) merilisnya secara atomic ke
`/var/www/ryanprayoga.dev/current`.

## Status sekarang

- **Cutover Selesai:** Situs v4 telah aktif dilayani oleh Caddy `file_server` di `/var/www/ryanprayoga.dev/current`.
- Proses PM2 lama (`web-portofolio`) telah dinonaktifkan (`pm2 delete`).
- Trigger `push` ke `main` di `.github/workflows/deploy.yml` telah aktif untuk continuous delivery.

## Langkah cutover (sekali jalan, urut)

1. **Siapkan direktori di VPS**

   ```bash
   sudo mkdir -p /var/www/ryanprayoga.dev/releases
   sudo chown -R ubuntu:ubuntu /var/www/ryanprayoga.dev
   ```

2. **Jalankan workflow manual** — GitHub → Actions → "Deploy
   web-portofolio" → Run workflow (branch `main`). Job `quality` harus
   hijau; job `deploy` mengisi `/var/www/ryanprayoga.dev/current`.
   Health check terakhir masih memeriksa domain yang saat ini dilayani
   PM2 — kalau step itu merah di run pertama (sebelum Caddy dipindah),
   abaikan; yang penting `current` terisi.

3. **Verifikasi isi rilis**

   ```bash
   ls -la /var/www/ryanprayoga.dev/current/
   # harus ada: index.html, _app/, sitemap.xml, robots.txt, work/
   ```

4. **Pindahkan Caddy dari reverse_proxy ke file_server** — edit
   `/etc/caddy/sites/ryanprayoga.dev.caddy` (atau blok terkait):

   ```caddy
   ryanprayoga.dev {
     root * /var/www/ryanprayoga.dev/current
     encode zstd gzip

     # WAJIB: adapter-static menulis /work/<slug> sebagai work/<slug>.html
     # (trailingSlash 'never'). Tanpa try_files, semua URL case study 404.
     try_files {path} {path}.html

     file_server

     handle_errors {
       @notfound expression {http.error.status_code} == 404
       rewrite @notfound /404.html
       file_server
     }

     header {
       X-Content-Type-Options nosniff
       Referrer-Policy strict-origin-when-cross-origin
       Permissions-Policy "camera=(), microphone=(), geolocation=()"
     }
     header /fonts/* Cache-Control "public, max-age=31536000, immutable"
     header /_app/immutable/* Cache-Control "public, max-age=31536000, immutable"
   }

   # ══════════════════════════════════════════════════════════
   # Subdomain Freelance: freelance.ryanprayoga.dev
   # ══════════════════════════════════════════════════════════
   freelance.ryanprayoga.dev {
     root * /var/www/ryanprayoga.dev/current
     encode zstd gzip

     # Root menyajikan freelance.html hasil prerender adapter-static
     rewrite / /freelance.html
     try_files {path} {path}.html /freelance.html

     file_server

     handle_errors {
       @notfound expression {http.error.status_code} == 404
       rewrite @notfound /404.html
       file_server
     }

     header {
       X-Content-Type-Options nosniff
       Referrer-Policy strict-origin-when-cross-origin
       Permissions-Policy "camera=(), microphone=(), geolocation=()"
     }
     header /fonts/* Cache-Control "public, max-age=31536000, immutable"
     header /_app/immutable/* Cache-Control "public, max-age=31536000, immutable"
   }
   ```

   > **DNS Setup Subdomain**:
   > Buat DNS `A` (atau `CNAME`) record di Cloudflare / registrar DNS Anda:
   >
   > - Type: `A`
   > - Name / Host: `freelance`
   > - Value: IP VPS yang sama dengan `ryanprayoga.dev`

   ```bash
   sudo caddy validate --config /etc/caddy/Caddyfile
   sudo systemctl reload caddy
   ```

5. **Verifikasi live** — `https://ryanprayoga.dev` dan `https://freelance.ryanprayoga.dev`
   keduanya harus aktif melayani konten masing-masing dengan SSL otomatis dari Caddy.
   Cek juga `/work/pantauanggaran`, `/freelance`, dan `/sitemap.xml`.

6. **Matikan proses PM2 lama**

   ```bash
   pm2 delete web-portofolio && pm2 save
   ```

7. **Nyalakan auto-deploy** — di `.github/workflows/deploy.yml`,
   aktifkan blok `push` yang dikomentari, commit, push. Push berikutnya
   akan melewati gate quality penuh sebelum rilis.

## Rollback

Rilis lama disimpan (5 terakhir) di
`/var/www/ryanprayoga.dev/releases/`:

```bash
ln -sfn /var/www/ryanprayoga.dev/releases/<sha-lama> /var/www/ryanprayoga.dev/current
```

Tanpa reload Caddy — symlink switch instan.
