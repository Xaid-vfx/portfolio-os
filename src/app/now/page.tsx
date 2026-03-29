import { Activity } from 'lucide-react'
import { getActivities } from '@/lib/unified-data'

export default function NowPage() {
  const activities = getActivities()

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Now</h1>
        </div>
        <p className="text-muted-foreground">
          What I&apos;m currently working on, learning, and thinking about.
        </p>
        <p className="text-sm text-muted-foreground mt-2">{currentDate}</p>
      </div>

      <div className="grid gap-6">
        <section className="p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Building</h2>
          <div className="space-y-4">
            {activities
              .filter((a) => a.type === 'build')
              .slice(0, 2)
              .map((activity) => (
                <div key={activity.id}>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                </div>
              ))}
            {activities.filter((a) => a.type === 'build').length === 0 && (
              <p className="text-sm text-muted-foreground">Nothing building right now</p>
            )}
          </div>
        </section>

        <section className="p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Learning</h2>
          <div className="space-y-4">
            {activities
              .filter((a) => a.type === 'learn')
              .slice(0, 2)
              .map((activity) => (
                <div key={activity.id}>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                </div>
              ))}
            {activities.filter((a) => a.type === 'learn').length === 0 && (
              <p className="text-sm text-muted-foreground">Currently exploring new ideas</p>
            )}
          </div>
        </section>

        <section className="p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Thinking About</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <span>How to build systems that compound over time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <span>AI-native UX patterns that feel invisible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <span>Distributed systems fundamentals applied to personal tools</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
