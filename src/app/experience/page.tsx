import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
  {
    id: '1',
    role: 'Junior Software Developer',
    company: 'Code Parallel',
    period: 'Oct 2023 - Present',
    description: 'Full Stack Developer working on enterprise-grade AI applications. Leading AI integration into products and building scalable web solutions.',
    highlights: [
      'Worked on 3 major projects and 7+ internal tools',
      'Led AI integration into products using LangChain and OpenAI',
      'Built enterprise applications with Next.js, React, TypeScript, and Python',
      'Deployed solutions using AWS and Docker',
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Experience</h1>
        </div>
        <p className="text-muted-foreground">
          Building AI-powered applications and learning every day.
        </p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 border-l border-border">
            <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
            
            <div className="mb-2">
              <h3 className="text-lg md:text-xl font-semibold">{exp.role}</h3>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <span className="font-medium text-foreground">{exp.company}</span>
                <span className="text-sm">•</span>
                <span className="flex items-center gap-1 text-sm">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{exp.description}</p>

            <ul className="space-y-2">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
