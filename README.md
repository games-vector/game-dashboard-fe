# Game Dashboard Frontend

A config-driven frontend application that displays all available games in a dashboard with cards. Users can click on game cards to view details and launch games in demo mode.

## Features

- **Dashboard**: Displays all games in a responsive grid layout
- **Game Details**: View detailed information about each game
- **Play Demo**: Launch games in demo mode
- **Share Link**: Copy game URL to clipboard
- **Fully Responsive**: Works on mobile, tablet, and desktop

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- React Router v7 for routing
- Tailwind CSS for styling
- Axios for API calls

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
VITE_API_BASE_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── GameCard.tsx          # Individual game card component
│   │   └── GameGrid.tsx          # Grid layout for game cards
│   ├── GameDetails/
│   │   ├── GameDetailsPage.tsx  # Game details page component
│   │   ├── PlayDemoButton.tsx   # Play demo button
│   │   ├── ShareButton.tsx      # Share/copy link button
│   │   └── Toast.tsx            # Toast notification component
│   └── Layout/
│       └── AppLayout.tsx         # Main layout wrapper
├── services/
│   └── api.service.ts            # API service for backend calls
├── types/
│   └── index.ts                  # TypeScript types/interfaces
├── config/
│   └── env.ts                    # Environment configuration
├── App.tsx                       # Main app component with routes
└── main.tsx                      # Entry point
```

## API Endpoints

- `GET /api/games/dashboard` - Get all games with extended information
- `POST /wallet/doLoginAndLaunchGame` - Launch game with credentials

## Usage

1. Navigate to the dashboard to see all available games
2. Click on a game card to view details
3. Click "Demo Play" to open the game in a new tab
4. Click "Share Link" to copy the game URL to clipboard

## Deployment to Vercel

### Prerequisites
- Vercel account (free tier available)
- Code pushed to GitHub/GitLab/Bitbucket (optional, can use CLI)

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"** and import your repository

4. **Configure the project:**
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://api.demolink.games`
   - Apply to: Production, Preview, Development

6. **Click "Deploy"**

7. **Your app will be live** at a URL like: `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Navigate to project directory:**
   ```bash
   cd game-dashboard-fe
   ```

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

5. **Set environment variable** (if not set during deployment):
   ```bash
   vercel env add VITE_API_BASE_URL production
   # Enter: https://api.demolink.games
   ```

### Environment Variables

The following environment variable is required:

- `VITE_API_BASE_URL` - Backend API base URL (default: `http://localhost:3000`)

**Production**: `https://api.demolink.games`

### Post-Deployment Checklist

- [ ] Verify the dashboard loads games from the API
- [ ] Test clicking on a game card navigates to details page
- [ ] Test "Demo Play" button opens game in new tab
- [ ] Test "Share Link" button copies URL to clipboard
- [ ] Verify all images/GIFs load correctly from HTTPS URLs
- [ ] Test on mobile device for responsiveness

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel automatically provides HTTPS

### Vercel Free Tier Includes

- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments for every commit
