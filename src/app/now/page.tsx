import { getActivities } from '@/lib/unified-data'

export default function NowPage() {
  const activities = getActivities()

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const buildingItems = activities.filter((a) => a.type === 'build').slice(0, 3)
  const learningItems = activities.filter((a) => a.type === 'learn').slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-xl font-semibold mb-1">Now</h1>
        <p className="text-sm text-muted-foreground">
          What I&apos;m currently working on, learning, and thinking about.
          <span className="ml-2 text-muted-foreground/60">{currentDate}</span>
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Building</h2>
          <div className="space-y-4">
            {buildingItems.length > 0 ? (
              buildingItems.map((activity) => (
                <div key={activity.id}>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Nothing active right now.</p>
            )}
          </div>
        </section>

        <div className="border-t border-border" />

        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Learning</h2>
          <div className="space-y-4">
            {learningItems.length > 0 ? (
              learningItems.map((activity) => (
                <div key={activity.id}>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{activity.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Exploring new ideas.</p>
            )}
          </div>
        </section>

        <div className="border-t border-border" />

        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Thinking About</h2>
          <ul className="space-y-3">
            {[
              'Whether agent orchestration should be DAG-based or event-driven at the edges',
              'The right abstraction layer for local-first AI - should models know they\u0027re running on-device?',
              'How to make deployment invisible without hiding complexity that matters',
            ].map((thought, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{thought}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
