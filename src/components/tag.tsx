import { cn } from '@/lib/utils'

interface TagProps {
  tag: string
  count?: number
  onClick?: () => void
  className?: string
}

export function Tag({ tag, count, onClick, className }: TagProps) {
  const Comp = onClick ? 'button' : 'span'

  return (
    <Comp
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] bg-accent text-muted-foreground transition-colors',
        onClick && 'hover:bg-border hover:text-foreground cursor-pointer',
        className
      )}
    >
      {tag}
      {count !== undefined && (
        <span className="text-[10px] opacity-60">{count}</span>
      )}
    </Comp>
  )
}
