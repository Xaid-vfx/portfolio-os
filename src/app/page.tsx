import Link from 'next/link'
import { getAllProjects } from '@/lib/content'
import { getActivities } from '@/lib/unified-data'
import { ActivityFeed } from '@/components/activity-feed'
import { ProjectCard } from '@/components/project-card'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const projects = getAllProjects()
  const activities = getActivities()
  const recentProjects = projects.slice(0, 5)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">

      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">Mohd Zaid</h1>
        <p className="text-muted-foreground leading-relaxed max-w-xl">
          Systems engineer building AI-native tooling, distributed backends, and developer infrastructure.
          I think in systems — from multi-agent orchestration to real-time data pipelines to cloud-native deployments.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-foreground border border-border px-3 py-1.5 rounded hover:bg-accent transition-colors"
          >
            Projects <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ask AI →
          </Link>
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Resume →
          </Link>
        </div>
      </section>

      {/* Signals */}
      <section className="mb-16">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Signals</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span className="text-muted-foreground">Ranked top 200 globally in Clash of Clans (~100M+ players)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span className="text-muted-foreground">Started building brute-force scripts at 15 to understand system vulnerabilities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span className="text-muted-foreground">Reduced infra costs by 94% in production systems</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span className="text-muted-foreground">Built systems handling millions of events and real-time data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span className="text-muted-foreground">Known for shipping systems in hours/days instead of weeks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span className="text-muted-foreground">Focused on AI-native developer tooling and automation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span className="text-muted-foreground">Strong bias toward real-time, low-latency systems</span>
          </li>
        </ul>
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent Projects</h2>
            <Link href="/projects" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              All →
            </Link>
          </div>
          <div>
            {recentProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Activity</h2>
          <ActivityFeed activities={activities.slice(0, 6)} />

          <div className="mt-8 space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Explore</h2>
            {[
              { href: '/graph', label: 'Knowledge Graph' },
              { href: '/search', label: 'Semantic Search' },
              { href: '/ask', label: 'AI Companion' },
              { href: '/suggest', label: 'What to Build' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {label}
                <ArrowRight className="w-3 h-3 opacity-40" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
