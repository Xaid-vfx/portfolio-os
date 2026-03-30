'use client'

import { Activity as ActivityType } from '@/lib/unified-data'
import { timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface ActivityFeedProps {
  activities: ActivityType[]
  className?: string
}

const typeDot: Record<string, string> = {
  build: 'bg-amber-400',
  ship: 'bg-emerald-400',
  learn: 'bg-blue-400',
  update: 'bg-violet-400',
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className={cn('text-sm text-muted-foreground', className)}>
        No recent activity
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1.5">
            <span className={cn('block w-1.5 h-1.5 rounded-full', typeDot[activity.type] ?? 'bg-neutral-300')} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium truncate">{activity.title}</span>
              <span className="text-xs text-muted-foreground flex-shrink-0">{timeAgo(activity.timestamp)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
