# Portfolio OS

A self-evolving personal operating system that combines Notion-style content management with AI-powered features.

## Features

- **Structured Content**: MDX-based project documentation
- **Knowledge Graph**: Interactive D3.js visualization of project relationships
- **AI Search**: Semantic search using OpenAI embeddings
- **AI Companion**: Streaming AI responses about your work
- **Memory Layer**: Autonomous insight generation
- **Activity Feed**: Track progress and updates

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your OpenAI API key

# Generate embeddings (optional, for semantic search)
npm run embed

# Run autonomous agent (optional, for memory)
npm run agent

# Start development server
npm run dev
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- D3.js for visualization
- OpenAI API for embeddings and chat
- MDX for content

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── api/              # API routes
│   ├── projects/         # Project pages
│   └── ...
├── components/           # React components
├── lib/                  # Utilities and data processing
└── content/              # MDX projects and data
    └── projects/         # Project documentation
```

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run embed` - Generate content embeddings
- `npm run agent` - Run autonomous reasoning agent
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Required for AI features |
| `GITHUB_USERNAME` | GitHub username for repo fetching |
| `GITHUB_TOKEN` | GitHub token for private repos |

## License

MIT
