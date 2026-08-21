# Michael Paul — Portfolio

Personal website, portfolio, and blog for Michael Paul. Built with Next.js and Sanity.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **CMS**: [Sanity](https://www.sanity.io/) (Headless CMS)
- **Syntax Highlighting**: [Shiki](https://shiki.style/)
- **Theming**: `next-themes` for Dark/Light mode support

## ✨ Features & Recent Developments

- **Projects Showcase**: Dynamic projects section displaying previous, in progress, and future projects with custom image previews, live URLs, and GitHub links.
- **Bookmarks Library**: Responsive grid layout for bookmarks categorized by topics, featuring image previews for better visual appeal.
- **Sanity Studio Integration**: Embedded Sanity Studio at `/studio` with a custom sidebar structure for managing Blog Posts, Projects, Bookmarks, and the About Page.
- **Rich Text Rendering**: Uses `@portabletext/react` for rendering rich text content from Sanity.
- **Optimized Images**: Integrated `@sanity/image-url` for optimized image delivery.

## 🛠️ Getting Started

### 1. Install Dependencies

First, clone the repository and install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory and add your Sanity credentials:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
# Optional: for preview drafts
SANITY_API_READ_TOKEN="your_read_token"
```

### 3. Run the Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Content Management (Sanity Studio)

You can manage all your content (Posts, Projects, Bookmarks, About) directly from the embedded Sanity Studio.

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to access the dashboard.

## 🚢 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Ensure you add your Sanity environment variables in the Vercel project settings before deploying.
