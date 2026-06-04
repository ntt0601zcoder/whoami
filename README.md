# whoami — Portfolio · Nguyen Trong Thuan

Portfolio cá nhân của **Nguyen Trong Thuan** (Senior Platform Engineer), xây bằng
**React + Vite + TypeScript**. Tiếng Anh, dark/light, 4 bộ màu, animation tinh tế
và tôn trọng `prefers-reduced-motion`.

## Yêu cầu

- **Node 22** (có sẵn file `.nvmrc`). Nếu dùng nvm: `nvm use`.

## Chạy local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + build ra dist/
npm run preview    # xem thử bản build
```

## Tính năng

- **Dark / Light** — nút mặt trời/mặt trăng; lần đầu theo `prefers-color-scheme`,
  rồi nhớ lựa chọn trong `localStorage`. Palette tự đổi theo mode.
- **4 bộ màu** (`terminal`, `navy`, `light`, `slate`) — bộ chọn palette **chỉ hiện khi dev**
  (`import.meta.env.DEV`). Production dùng palette `terminal` (xanh lá) cho **cả dark lẫn light**.
- **Tải CV (PDF)**, **animated metrics** (đếm số khi cuộn tới), **form liên hệ**.
- Animation: fade + dịch nhẹ + stagger + scroll-reveal (Framer Motion).

### Đổi palette mặc định cho production

Sửa mapping palette-theo-mode trong [`src/theme/themes.ts`](src/theme/themes.ts):

```ts
export const PALETTE_BY_MODE: Record<Mode, Palette> = {
  dark: 'terminal', // green on near-black
  light: 'terminal', // green on off-white
}
```

### Form liên hệ

Mặc định form mở ứng dụng email qua `mailto:` (không cần backend). Muốn nhận trực
tiếp vào hộp thư qua [Formspree](https://formspree.io):

1. Tạo form trên Formspree, lấy ID (ví dụ `xeqwabcd`).
2. Đặt biến môi trường khi build:

```bash
# .env (local) hoặc biến môi trường trên Cloudflare Pages
VITE_FORMSPREE_ID=xeqwabcd
```

Có ID thì form POST qua Formspree; không có thì tự fallback về `mailto:`.

## Sửa nội dung

Tất cả nội dung (song ngữ) nằm trong một file:
[`src/i18n/content.ts`](src/i18n/content.ts) — profile, summary, metrics,
experience, projects, stack, education. Mỗi trường prose có dạng
`{ en: '…', vi: '…' }`. Trong các highlight, dùng `**text**` để in đậm.

Thay CV: đặt file PDF mới vào `public/` rồi cập nhật `profile.resumePath` trong
`content.ts` (và thuộc tính `download` trong Hero/About nếu muốn đổi tên file tải về).

## Deploy lên Cloudflare Pages

1. Push repo lên GitHub/GitLab.
2. Cloudflare Pages → **Create project** → kết nối repo.
3. Cấu hình build:
   - **Framework preset:** None / Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION = 22` (hoặc Cloudflare tự đọc `.nvmrc`).
     Thêm `VITE_FORMSPREE_ID` nếu dùng Formspree.
4. Gắn **custom domain** trong tab *Custom domains* của project.

Đây là single-page (cuộn dọc), không cần SPA rewrite. File
[`public/_headers`](public/_headers) đã set cache cho `assets/*` và vài header bảo mật.

## Cấu trúc

```text
src/
  i18n/        content.ts (toàn bộ nội dung, tiếng Anh)
  theme/       themes.ts (palette + mapping theo mode) + ThemeContext
  lib/         motion.ts (variants Framer Motion dùng chung)
  hooks/       useActiveSection
  styles/      tokens.css (4 palette × 2 mode) · base · components · sections
  components/
    ui/        Animate, Counter, Icons, RichText, SectionHeader
    layout/    Nav, Controls, Footer
    sections/  Hero, About, Metrics, Experience, Projects, Stack, Education, Contact
```

---

Designed & built with React, Vite and a lot of care.
