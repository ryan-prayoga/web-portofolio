import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Script inline di app.html (tema + bahasa anti-flash) tidak di-hash otomatis
// oleh SvelteKit, jadi hash-nya dihitung dari isi file saat build.
const appHtml = readFileSync(new URL('./src/app.html', import.meta.url), 'utf8');
const appInlineScriptHashes = [...appHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  ([, body]) => `sha256-${createHash('sha256').update(body).digest('base64')}`,
);

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    // Situs full prerender: SvelteKit menulis CSP sebagai <meta http-equiv>
    // dan menambahkan hash untuk script inline buatannya sendiri.
    csp: {
      mode: 'hash',
      directives: {
        'default-src': ['self'],
        'script-src': ['self', ...appInlineScriptHashes],
        // 'unsafe-inline' wajib: atribut style (app.html, drawably, Nav) dan
        // <style> hasil komponen. Tidak ada input pengguna yang dirender.
        'style-src': ['self', 'unsafe-inline'],
        'img-src': ['self', 'data:'],
        'font-src': ['self'],
        'connect-src': ['self'],
        'object-src': ['none'],
        'base-uri': ['self'],
        'form-action': ['self'],
      },
    },
  },
};

export default config;
