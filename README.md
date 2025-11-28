# BangaloreRentHub - Frontend

A modern React + TypeScript + Vite + Tailwind CSS frontend for searching rental properties in Bangalore.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Backend API running at `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Type check with TypeScript

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Project Structure

```
src/
├── api/           # API client and backend communication
├── components/    # React components
├── styles/        # Global styles
└── types/         # TypeScript type definitions
```

## Features

- 🔍 Real-time rental property search
- 🎨 Modern, responsive UI design
- ⚡ Fast performance with Vite
- 🎯 Type-safe with TypeScript
- 📱 Mobile-friendly interface

## API Endpoints

The frontend expects the following backend endpoints:

- `POST /api/search` - Search rentals with filters (location, bhk, minRent, maxRent)
- `GET /api/rentals` - Fetch all rentals (optional)

## Development

This project uses Vite's proxy feature to forward `/api/*` requests to the backend during development, avoiding CORS issues.

## License

MIT

