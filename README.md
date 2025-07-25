# Kambo Healing Website - Matt O'Brien

A comprehensive Kambo practitioner website for Matt O'Brien's authentic healing practice in Dallas, Texas. This website provides an immersive digital experience about traditional Amazonian medicine and holistic wellness.

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: Drizzle ORM with in-memory storage
- **Styling**: Tailwind CSS with custom earth-tone palette
- **Build Tool**: Vite
- **Package Manager**: npm

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

**Note**: This is a Node.js project, not Python. No Python virtual environment or UV is needed.

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd kambo-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd client
   npm install
   cd ..
   ```

## Development

To start the development server:

```bash
npm run dev
```

This command:
- Starts the Express.js backend server
- Launches the Vite development server for the frontend
- Serves both on the same port with hot reloading enabled
- Opens the application at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes (Drizzle)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── lib/           # Utilities and configurations
│   └── public/            # Static assets
├── server/                # Express.js backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage interface
├── shared/                # Shared types and schemas
└── attached_assets/       # Local image assets
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Security**: Updated dependencies and secure configurations
- **Professional Design**: Amazon rainforest imagery and earth-tone palette
- **Accessibility**: WCAG compliant components using Radix UI
- **Modern Stack**: TypeScript, React Query, and modern tooling

## Development Notes

- The frontend and backend run on the same port during development
- Static assets are served from `attached_assets/` directory
- Database uses in-memory storage (no external database required)
- Hot reloading is enabled for both frontend and backend changes

## Deployment

The application is configured for Azure App Services deployment with:
- Production build optimization
- Static file serving
- Security headers
- Health check endpoints

## Contact Information

**Matt O'Brien - Kambo Practitioner**
- Phone: 469-734-6405
- Email: kambocowboy@gmail.com
- Location: Dallas, Texas

---

For questions about the codebase or development setup, refer to the documentation in `replit.md`.