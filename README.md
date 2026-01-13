# SpeakAble

A real-time gesture recognition and text-to-speech web application built with React, TypeScript, and MediaPipe.

## Features

- 🎯 Real-time hand gesture recognition
- 🗣️ Text-to-speech synthesis
- 📹 Live camera feed processing
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Vite

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **MediaPipe** - Gesture recognition
- **Supabase** - Backend services
- **Socket.IO** - Real-time communication

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SpeakAble-website.git
cd SpeakAble-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/SpeakAble-website)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
SpeakAble-website/
├── src/
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── .env.example        # Environment variables template
└── vercel.json         # Vercel configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
