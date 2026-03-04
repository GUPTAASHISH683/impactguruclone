# 🌟 ImpactGuru – Full-Stack CMS Crowdfunding Platform

A production-grade, CMS-driven crowdfunding platform. **Every word on the frontend is served from the database.**

---

## 🏗 Project Structure

```
impactguru-fullstack/
├── frontend/               ← React + Vite + Tailwind (unchanged UI)
│   └── src/
│       ├── api/client.js   ← API client + endpoint helpers
│       ├── components/     ← All components now API-driven
│       └── hooks/useApi.js ← Generic data-fetching hook
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma   ← Full normalized MySQL schema
│   │   └── seed.js         ← 17 campaigns + all CMS content
│   └── src/
│       ├── app.js          ← Express app + routes
│       ├── server.js       ← HTTP entry point
│       ├── controllers/    ← Request handlers
│       ├── services/       ← Business logic + DB queries
│       ├── routes/         ← Express routers
│       ├── middleware/     ← Error handler, validation
│       └── utils/          ← Prisma client, response helpers, pagination
├── package.json            ← Root (concurrently)
└── README.md
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js ≥ 18
- MySQL 8+ running locally (or via Docker)

### 2. Create MySQL database
```sql
CREATE DATABASE impactguru CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure environment
```bash
cp backend/.env.example backend/.env
# Edit backend/.env — set your DATABASE_URL
```

`.env` format:
```
DATABASE_URL="mysql://root:yourpassword@localhost:3306/impactguru"
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Install all dependencies
```bash
npm run install:all
```

### 5. Run Prisma migrations
```bash
npm run db:push        # push schema to DB (dev shortcut)
# OR
npm run db:migrate     # create named migration
```

### 6. Seed the database
```bash
npm run db:seed
```
Seeds: 17 campaigns, 6 categories, 4 testimonials, 6 FAQs, full navigation, footer, hero content, all section text.

### 7. Start the app
```bash
npm run dev
```

- **Frontend** → http://localhost:5173  
- **Backend**  → http://localhost:4000/api/health

---

## 🌍 API Reference

| Method | Endpoint                          | Description                        |
|--------|-----------------------------------|------------------------------------|
| GET    | `/api/health`                     | Health check                       |
| GET    | `/api/navigation?location=header` | Navigation links                   |
| GET    | `/api/footer`                     | Footer columns, socials, meta      |
| GET    | `/api/pages/:slug`                | Full page with sections & blocks   |
| GET    | `/api/pages/:slug/sections/:key`  | Single section + content blocks    |
| GET    | `/api/campaigns?page=1&limit=10`  | Paginated campaigns                |
| GET    | `/api/campaigns?category=medical` | Filter by category                 |
| GET    | `/api/campaigns?urgent=true`      | Filter urgent campaigns            |
| GET    | `/api/campaigns/:id`              | Single campaign                    |
| POST   | `/api/campaigns`                  | Create campaign                    |
| PUT    | `/api/campaigns/:id`              | Update campaign                    |
| DELETE | `/api/campaigns/:id`              | Delete campaign                    |
| GET    | `/api/categories`                 | All categories                     |
| GET    | `/api/testimonials`               | All testimonials                   |
| GET    | `/api/faqs`                       | All FAQs                           |
| GET    | `/api/settings?group=general`     | Settings (optionally by group)     |
| POST   | `/api/settings`                   | Upsert a setting                   |

### Paginated Response Shape
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 17,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 📄 Database Schema Overview

| Table           | Purpose                                           |
|-----------------|---------------------------------------------------|
| `pages`         | URL-addressable pages (home, about, etc.)         |
| `sections`      | Named blocks within a page (hero, cta, etc.)      |
| `content_blocks`| Individual key/value content per section          |
| `navigation`    | Header/footer/mobile nav links                    |
| `footer_columns`| Footer link column headings                       |
| `footer_links`  | Individual footer links                           |
| `footer_socials`| Social media links                                |
| `footer_meta`   | Address, copyright, disclaimer, legal links       |
| `campaigns`     | Fundraising cards with pagination support         |
| `categories`    | Campaign category tags                            |
| `testimonials`  | User reviews/quotes                               |
| `faqs`          | Accordion FAQ items                               |
| `settings`      | Global config flags (typed key/value store)       |
| `metadata`      | Per-page SEO: title, description, OG tags         |
| `users`         | Admin/editor/viewer CMS users                     |

---

## 📦 Pagination

The seed has **17 campaigns** (> 10) so pagination activates automatically.

- Default: `page=1&limit=10`
- Frontend shows numbered page buttons + Prev/Next
- Filter by category resets to page 1
- API response always includes `meta.total`, `meta.totalPages`, `meta.hasNextPage`

---

## 🔧 Useful Commands

```bash
npm run db:studio    # Open Prisma Studio (visual DB browser)
npm run db:reset     # Drop + re-migrate + re-seed
npm run build        # Production build of frontend
```
