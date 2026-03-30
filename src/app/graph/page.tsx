import { KnowledgeGraph } from '@/components/graph'
import { buildGraphData } from '@/lib/graph'

export default function GraphPage() {
  const graphData = buildGraphData()

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Knowledge Graph</h1>
        <p className="text-sm text-muted-foreground">
          Interactive visualization of projects, technologies, and their relationships.
        </p>
      </div>

      <div className="flex items-center gap-5 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Live
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Building
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" /> Archived
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" /> Tag
        </span>
        <span className="ml-auto hidden sm:block">Scroll to zoom · drag to pan · click to navigate</span>
      </div>

      <KnowledgeGraph data={graphData} className="mb-6" />

      <div className="flex items-center gap-8 py-4 border-t border-border text-sm">
        {[
          { label: 'Nodes', value: graphData.nodes.length },
          { label: 'Projects', value: graphData.nodes.filter((n) => n.type === 'project').length },
          { label: 'Tags', value: graphData.nodes.filter((n) => n.type === 'tag').length },
          { label: 'Connections', value: graphData.links.length },
        ].map(({ label, value }) => (
          <div key={label}>
            <span className="font-medium tabular-nums">{value}</span>
            <span className="text-muted-foreground ml-1.5">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
