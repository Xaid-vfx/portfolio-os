import { cn } from '@/lib/utils'

interface TagProps {
  tag: string
  count?: number
  onClick?: () => void
  className?: string
}

export function Tag({ tag, count, onClick, className }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-foreground transition-colors hover:bg-accent/80',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {tag}
      {count !== undefined && (
        <span className="text-[10px] text-muted-foreground">{count}</span>
      )}
    </button>
  )
}
