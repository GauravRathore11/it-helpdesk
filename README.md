# IT Helpdesk System

A full-stack IT helpdesk and asset management platform built with Next.js, Prisma, and PostgreSQL. Designed for internal teams to manage support tickets, track IT assets, and handle approval workflows.

**Live:** [Deployed on Vercel](https://vercel.com) · **Database:** [Neon PostgreSQL](https://neon.tech)

---

## Features

- **Authentication** — JWT-based login with role-based access (Admin, Manager, Employee)
- **Ticket Management** — Create, assign, and resolve support tickets with SLA tracking
- **Asset Inventory** — Track hardware assets, serial numbers, and allocation status
- **Asset Requests & Approvals** — Multi-step approval workflow for hardware requests
- **Dashboard** — Real-time overview of tickets, approvals, and activity
- **Notifications** — In-app notifications for ticket updates and approvals

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 7 |
| Database | PostgreSQL (Neon) |
| Auth | JWT + HTTP-only cookies |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### Setup

```bash
# Clone the repo
git clone https://github.com/GauravRathore11/it-helpdesk.git
cd it-helpdesk

# Install dependencies
npm install

# Copy env template and fill in your values
cp .env.example .env.local

# Push schema to database
npx prisma db push

# (Optional) Seed demo data
npx prisma db seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

See [`.env.example`](.env.example) for all required variables.

The critical ones:

```
DATABASE_URL       # Neon pooled connection string (for app)
DIRECT_URL         # Neon direct connection string (for migrations)
JWT_SECRET         # Any long random string
```

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com/new)
3. Add environment variables from `.env.example` in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js, no extra config needed

After first deploy, run migrations:

```bash
npx prisma migrate deploy
```

Or use `npx prisma db push` for a quick sync.

## Project Structure

```
src/
├── app/
│   ├── (admin)/          # Protected admin/dashboard pages
│   │   ├── dashboard/
│   │   ├── tickets/
│   │   ├── assets/
│   │   ├── approvals/
│   │   └── users/
│   ├── api/              # Next.js API routes
│   └── login/
├── components/
│   └── dashboard/        # Dashboard UI components
├── lib/
│   ├── prisma.ts         # Prisma client singleton
│   ├── auth.ts           # JWT helpers
│   └── dashboard.ts      # Dashboard data queries
└── middleware.ts          # Route protection
prisma/
├── schema.prisma
└── seed/
```

## License

MIT © 2026 Gaurav Rathore
