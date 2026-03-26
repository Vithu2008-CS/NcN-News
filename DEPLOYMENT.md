# NcN Deployment & Production Guide

This guide outlines how to deploy the **NcN Platform** to a production environment.

## 1. Environment Variables
Ensure the following variables are set in your production environment (Vercel/Docker):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/ncn"
REDIS_URL="redis://localhost:6379"
OPENAI_API_KEY="sk-..."
NEXT_PUBLIC_ADSENSE_ID="pub-xxx"
ADMIN_SECRET="your-secure-secret"
```

## 2. Infrastructure Setup

### Database
- Use **Supabase** or **Neon** for a managed PostgreSQL instance.
- Run migrations: `npx prisma migrate deploy`

### Redis (Queue System)
- Use **Upstash** for serverless Redis (compatible with BullMQ).
- **CRITICAL**: Ensure Redis is accessible to both the Next.js API and the background workers.

### Background Workers
- **Option A (Vercel Cron)**: Set up a recurring job in `vercel.json` to trigger `/api/cron/fetch`.
- **Option B (Separate Container)**: Deploy the `src/lib/queue/worker.ts` as a standalone Node.js process using PM2 or Docker.

## 3. SEO & AdSense Configuration
- Add your **Sitemap** at `/api/sitemap`.
- Ensure `robots.txt` is updated to allow crawling of the AI-generated summaries.
- Register your site in **Google AdSense** and add the script in the `RootLayout`.

## 4. Scalability
- The system is designed to handle thousands of articles. 
- Use **Meilisearch** for advanced search if the article count exceeds 10,000.
- Implement **CDN Caching** (Cloudflare) to reduce server load for the public frontend.

## 5. Deployment Commands
```bash
# Install
npm install

# Build
npm run build

# Start Production
npm run start
```
