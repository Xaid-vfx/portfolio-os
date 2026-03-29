import { KnowledgeGraph } from '@/components/graph'
import { buildGraphData } from '@/lib/graph'
import { GitBranch, Info, Smartphone } from 'lucide-react'

export default function GraphPage() {
  const graphData = buildGraphData()

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <GitBranch className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Knowledge Graph</h1>
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          An interactive visualization of projects, technologies, and their relationships.
        </p>
      </div>

      <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-lg bg-accent/50 border border-border">
        <div className="flex items-start gap-2 md:gap-3">
          <Info className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs md:text-sm">
            <p className="font-medium mb-1 md:mb-2 hidden sm:block">How to use:</p>
            <ul className="space-y-0.5 md:space-y-1 text-muted-foreground">
              <li>• <strong>Zoom/Pan:</strong> Mouse wheel and drag</li>
              <li>• <strong>Click:</strong> Navigate to project</li>
              <li className="hidden sm:block">• <strong>Drag:</strong> Reposition nodes</li>
            </ul>
            <p className="sm:hidden text-[10px] mt-1 text-muted-foreground">
              Pinch to zoom, tap nodes to navigate
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
          <span className="text-xs md:text-sm">Live</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
          <span className="text-xs md:text-sm">Building</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-400" />
          <span className="text-xs md:text-sm">Archived</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-purple-500" />
          <span className="text-xs md:text-sm">Tag</span>
        </div>
      </div>

      <KnowledgeGraph data={graphData} className="mb-6 md:mb-8" />

      <div className="p-4 md:p-6 rounded-xl border border-border bg-background">
        <h2 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Graph Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div>
            <div className="text-xl md:text-2xl font-bold">{graphData.nodes.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Nodes</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold">{graphData.nodes.filter(n => n.type === 'project').length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold">{graphData.nodes.filter(n => n.type === 'tag').length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Tags</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold">{graphData.links.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Connections</div>
          </div>
        </div>
      </div>
    </div>
  )
}
