import { Beaker, Zap, Brain, Mic, Terminal, Layers, Globe, Cpu } from 'lucide-react'

const experiments = [
  {
    id: '1',
    icon: Brain,
    title: 'LLM agent that rewrites PRs based on review comments',
    description: 'Feed it a PR review, it generates the fix. Not production-ready, but the iteration loop is surprisingly tight.',
    tags: ['ai', 'agents'],
  },
  {
    id: '2',
    icon: Mic,
    title: 'Mic → structured data pipeline',
    description: 'Speak a meeting summary, get a JSON object with action items, owners, and deadlines. Whisper + constrained decoding.',
    tags: ['ai', 'local-first'],
  },
  {
    id: '3',
    icon: Terminal,
    title: 'CLI that scaffolds infra from a one-liner',
    description: 'Describe what you want ("next.js with postgres and redis"), get a docker-compose, Terraform config, and CI pipeline.',
    tags: ['devtools', 'infra'],
  },
  {
    id: '4',
    icon: Layers,
    title: 'Local-first AI pipelines on Apple Silicon',
    description: 'Exploring what inference workloads are viable on consumer hardware. MLX is the unlock - unified memory changes everything.',
    tags: ['ai', 'mlx'],
  },
  {
    id: '5',
    icon: Zap,
    title: 'Real-time code diff visualization',
    description: 'WebSocket-powered live diff viewer. Watch code change as agents write it. Surprisingly useful for debugging multi-agent output.',
    tags: ['devtools', 'websockets'],
  },
  {
    id: '6',
    icon: Globe,
    title: 'Semantic search over Git history',
    description: 'Embed every commit message and diff. Ask "when did we change the auth flow?" and get the exact commit. Better than git log.',
    tags: ['ai', 'search'],
  },
  {
    id: '7',
    icon: Cpu,
    title: 'Agent memory with vector-backed context windows',
    description: 'Persistent agent memory using embeddings. Agents recall relevant context from past conversations without stuffing the prompt.',
    tags: ['ai', 'agents'],
  },
  {
    id: '8',
    icon: Beaker,
    title: 'Non-transferable NFTs as identity primitives',
    description: 'Soulbound tokens for reputation. Earned, not bought. Exploring how on-chain identity can replace OAuth for trust verification.',
    tags: ['web3', 'identity'],
  },
]

export default function ExperimentsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-xl font-semibold mb-1">Experiments</h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Half-baked ideas, proof-of-concepts, and things I&apos;m poking at. Not everything here ships.
          Some things are just for learning. Some turn into real projects.
        </p>
      </div>

      <div className="space-y-1">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="group py-4 border-b border-border/50 last:border-0"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-md bg-accent/50 text-muted-foreground group-hover:text-foreground transition-colors">
                <exp.icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium group-hover:text-foreground transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex gap-1.5 mt-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-accent/80 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
