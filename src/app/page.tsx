import Link from 'next/link'
import { getAllProjects } from '@/lib/content'
import { getActivities } from '@/lib/unified-data'
import { ActivityFeed } from '@/components/activity-feed'
import { ProjectCard } from '@/components/project-card'
import { ArrowRight, Sparkles, GitBranch, MessageCircle, Search } from 'lucide-react'

export default function HomePage() {
  const projects = getAllProjects()
  const activities = getActivities()
  const recentProjects = projects.slice(0, 3)

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      <section className="mb-8 md:mb-16">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Mohd Zaid</h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl">
            Full Stack Developer with 2+ years of experience in React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, AWS, and Docker. 
            Passionate about building scalable web applications with clean UI and excellent user experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm md:text-base"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm md:text-base"
          >
            <MessageCircle className="w-4 h-4" /> Ask About My Work
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
        <div className="lg:col-span-2">
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-semibold">Recent Projects</h2>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                All <ArrowRight className="w-3 h-3 hidden sm:inline" />
              </Link>
            </div>
            <div className="grid gap-3 md:gap-4">
              {recentProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 lg:mt-0">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Activity</h2>
            <ActivityFeed activities={activities.slice(0, 4)} />
          </section>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16">
        <Link
          href="/graph"
          className="group p-4 md:p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all"
        >
          <GitBranch className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-primary" />
          <h3 className="font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors">Knowledge Graph</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Explore project relationships</p>
        </Link>

        <Link
          href="/search"
          className="group p-4 md:p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all"
        >
          <Search className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-primary" />
          <h3 className="font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors">Semantic Search</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Find projects with AI</p>
        </Link>

        <Link
          href="/ask"
          className="group p-4 md:p-6 rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all sm:col-span-2 lg:col-span-1"
        >
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 text-primary" />
          <h3 className="font-semibold mb-1 md:mb-2 group-hover:text-primary transition-colors">AI Companion</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Ask about my work</p>
        </Link>
      </section>

      <section className="p-4 md:p-6 lg:p-8 rounded-xl bg-accent/50 border border-border">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div>
            <div className="text-2xl md:text-3xl font-bold">{projects.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-green-600">
              {projects.filter(p => p.frontmatter.status === 'live').length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Live</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">
              {projects.filter(p => p.frontmatter.status === 'building').length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Building</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold">
              {Array.from(new Set(projects.flatMap(p => p.frontmatter.tags || []))).length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Technologies</div>
          </div>
        </div>
      </section>
    </div>
  )
}
