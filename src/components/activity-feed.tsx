'use client'

import { Activity as ActivityType } from '@/lib/unified-data'
import { timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Hammer, Rocket, Brain, RefreshCcw } from 'lucide-react'

interface ActivityFeedProps {
  activities: ActivityType[]
  className?: string
}

const activityIcons = {
  build: Hammer,
  ship: Rocket,
  learn: Brain,
  update: RefreshCcw,
}

const activityColors = {
  build: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  ship: 'bg-green-500/10 text-green-600 border-green-500/20',
  learn: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  update: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className={cn('text-center py-8 text-sm text-muted-foreground', className)}>
        No recent activity
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {activities.map((activity) => {
        const Icon = activityIcons[activity.type]
        
        return (
          <div
            key={activity.id}
            className="flex gap-4 p-4 rounded-xl border border-border bg-background hover:bg-accent/50 transition-colors"
          >
            <div className={cn(
              'flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center',
              activityColors[activity.type]
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {timeAgo(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {activity.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
