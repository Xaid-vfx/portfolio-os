'use client'

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface GraphNode {
  id: string
  type: 'project' | 'tag'
  label: string
  status?: string
  url?: string
}

interface GraphLink {
  source: string
  target: string
  type: 'project-tag' | 'project-link'
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

interface KnowledgeGraphProps {
  data: GraphData
  className?: string
}

export function KnowledgeGraph({ data, className }: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight || 600

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg.append('g')

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', '#64748b')

    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(data.links)
        .id((d: any) => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))

    const link = g.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1)
      .attr('marker-end', 'url(#arrowhead)')

    const node = g.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', 'graph-node cursor-pointer')
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d: any) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }) as any)

    node.append('circle')
      .attr('r', (d) => d.type === 'project' ? 12 : 8)
      .attr('fill', (d) => {
        if (d.type === 'project') {
          switch (d.status) {
            case 'building': return '#eab308'
            case 'live': return '#22c55e'
            case 'archived': return '#94a3b8'
            default: return '#3b82f6'
          }
        }
        return '#8b5cf6'
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)

    node.append('text')
      .text((d) => d.label)
      .attr('x', (d) => d.type === 'project' ? 18 : 14)
      .attr('y', 4)
      .attr('font-size', '11px')
      .attr('fill', '#475569')
      .attr('font-family', 'system-ui, sans-serif')

    node.on('click', (_, d) => {
      if (d.url) {
        router.push(d.url)
      }
    })

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    return () => {
      simulation.stop()
    }
  }, [data, router])

  return (
    <div ref={containerRef} className={cn('w-full h-[600px] bg-accent/20 rounded-xl border border-border overflow-hidden', className)}>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  )
}
