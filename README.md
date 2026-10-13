# Discord Clone — Real-Time Team Communication Platform

A full-stack, feature-packed Discord clone built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, **Socket.IO**, **LiveKit**, **Prisma**, **Clerk**, and **UploadThing**.

---

## Live Demos

- **Vercel (Instant CDN & Serverless Fallback):** [https://your-app-name.vercel.app](https://your-app-name.vercel.app)
- **Render (Persistent WebSockets):** [https://your-app-name.onrender.com](https://your-app-name.onrender.com)

---

## Features

- **Real-Time Text Messaging:** Instant messaging powered by Socket.IO with automatic 1-second polling fallback for serverless environments.
- **Audio & Video Calls:** 1-on-1 and group conference calling built using LiveKit WebRTC Cloud.
- **Direct Messaging (DMs):** Private 1-on-1 messaging and video/audio calls between members.
- **Servers & Channels:**
  - Create and customize servers with server icons.
  - Multi-channel support: **TEXT**, **AUDIO**, and **VIDEO** channels.
  - Unique server invite links with auto-join flow.
- **Role-Based Access Control:**
  - `ADMIN`, `MODERATOR`, and `GUEST` member roles.
  - Kick members or promote/demote roles on the fly.
  - Channel deletion and server deletion protections.
- **Message Management:** Edit and soft-delete messages in real time.
- **File & Media Attachments:** Upload images, PDFs, audio, and video files directly in chat using UploadThing.
- **Emoji Picker:** Integrated emoji selector with instant reactions.
- **Infinite Scrolling:** Smooth batch message loading powered by TanStack React Query.
- **Authentication:** Complete authentication flow via Clerk (OAuth, email, profile management).
- **Modern UI / UX:** Responsive desktop & mobile sidebar layouts, dark/light theme switching with Tailwind CSS v4 and Radix UI primitives.

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router + Pages Router hybrid for Socket.IO)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Database & ORM:** [Prisma ORM 6](https://www.prisma.io/) with MySQL / TiDB Serverless
- **Real-Time:** [Socket.IO](https://socket.io/) & [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- **Audio / Video:** [LiveKit Components](https://livekit.io/) & WebRTC
- **Authentication:** [Clerk](https://clerk.com/)
- **File Uploads:** [UploadThing](https://uploadthing.com/)
- **State & Data Fetching:** [Zustand](https://zustand-demo.pmnd.rs/) & [TanStack React Query v5](https://tanstack.com/query)

---

## Getting Started

### Prerequisites

- Node.js `v20+` or `v24+`
- A MySQL or TiDB Serverless database
- Active accounts on Clerk, UploadThing, and LiveKit Cloud (all free tiers)

### 1. Clone the Repository

```bash
git clone https://github.com/NikhilSaini09/discord-like-app.git
cd discord-like-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Database (MySQL / TiDB)
DATABASE_URL="mysql://username:password@host:port/database?sslaccept=strict"

# UploadThing
UPLOADTHING_TOKEN=...

# LiveKit Cloud (Audio & Video)
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
NEXT_PUBLIC_LIVEKIT_URL=wss://your-subdomain.livekit.cloud

# Site URL (for Socket connection)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Push Database Schema

Generate Prisma client and push your schema to your database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## Deployment

### Deploy on Vercel

1. Push your repository to GitHub.
2. Import the project on [Vercel](https://vercel.com/).
3. Set the **Build Command** to:

   ```bash
   npx prisma generate && next build
   ```

4. Add all environment variables from `.env` (set `NEXT_PUBLIC_SITE_URL` to your Vercel URL, e.g., `https://your-app.vercel.app`).
5. Click **Deploy**.

> **Note:** Vercel functions are serverless and do not support persistent WebSockets. The application will automatically operate using TanStack Query's built-in 1-second polling fallback.

---

### Deploy on Render.com (Persistent WebSockets)

1. Create a **New Web Service** on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Configure the service:
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
4. Add the environment variables from `.env` (set `NEXT_PUBLIC_SITE_URL` to `https://your-service.onrender.com`).
5. Click **Create Web Service**.

---
