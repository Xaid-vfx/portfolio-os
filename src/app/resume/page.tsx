import { Download, Mail, Github, Globe, Phone, MapPin } from 'lucide-react'

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-1">Resume</h1>
          <p className="text-sm text-muted-foreground">Mohd Zaid · Software Engineer</p>
        </div>
        <a
          href="/Zaid_CV-3.pdf"
          download
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-sm hover:bg-accent transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a>
      </div>

      {/* Contact */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mb-10 pb-10 border-b border-border">
        <a href="mailto:mohdzaid.work@gmail.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Mail className="w-3.5 h-3.5" />
          mohdzaid.work@gmail.com
        </a>
        <a href="tel:+917052360920" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Phone className="w-3.5 h-3.5" />
          +91 7052360920
        </a>
        <a
          href="https://okzaid.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          okzaid.com
        </a>
        <a
          href="https://github.com/xaid-vfx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          github.com/xaid-vfx
        </a>
      </div>

      <div className="space-y-10">
        {/* Summary */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Summary</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Systems-oriented engineer with experience across distributed backends, cloud infrastructure, AI-native tooling, and full-stack product development.
            Built and shipped production systems at scale — from campaign platforms processing millions of events to real-time trading infrastructure serving 350k+ users.
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Experience</h2>
          <div className="space-y-6">
            {[
              {
                role: 'Software Engineer',
                company: 'Absinthe Labs',
                location: 'NYC, US (Remote)',
                period: 'Oct 2025 – Present',
                highlights: [
                  'Owned core campaign and incentives platform end-to-end — 100+ production features across distributed backends, identity verification, and high-throughput data pipelines',
                  'Engineered distributed ingestion systems handling millions of submissions with concurrency-safe processing and rate limiting',
                  'Reduced infrastructure costs from $300/day to $500/month (94% reduction) via containerization and deployment redesign',
                  'Built AI-powered website generator and reputation-based identity verification using non-transferable NFTs',
                ],
              },
              {
                role: 'Full Stack Developer',
                company: 'IG Group',
                location: 'Bangalore, India',
                period: 'Sept 2024 – Sept 2025',
                highlights: [
                  'Migrated on-prem Spring Boot trading systems to AWS using Terraform — 35% cost reduction, 99.99% uptime, sub-50ms latency for 350k+ traders',
                  'Built distributed Kafka pipelines and WebSocket services for real-time trading data sync between cloud and on-prem systems',
                  'Deployed Spring Boot microservices on Nomad processing 10k+ Kafka events daily with zero downtime',
                ],
              },
              {
                role: 'Co-founder & Engineering Lead',
                company: 'Bloom',
                location: 'London, UK (Remote)',
                period: 'Dec 2023 – Aug 2024',
                highlights: [
                  'Co-founded multi-tenant apprenticeship platform for African markets — 1,200+ users, 50+ programs, 15+ partner organizations',
                  'Designed multi-tenant backend with Supabase RLS, PostgreSQL triggers, and real-time messaging via LISTEN/NOTIFY',
                  'Integrated Paystack Split Payments for automated mentor payouts with regional compliance',
                ],
              },
              {
                role: 'Full Stack Developer',
                company: 'Graviti',
                location: 'Remote',
                period: 'Oct 2022 – Dec 2023',
                highlights: [
                  'Built real-time order tracking platform using Google Maps, WebSockets, and geolocation for 100+ manufacturers and transporters',
                  'Developed backend REST APIs synchronizing live location and order status across distributed logistics workflows',
                  'Engineered custom in-browser PDF/image viewer with React and PDF.js for cross-device document rendering',
                ],
              },
            ].map((exp) => (
              <div key={exp.company}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-sm font-medium">{exp.role}</p>
                    <p className="text-sm text-muted-foreground">{exp.company} · {exp.location}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 mt-0.5">{exp.period}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                label: 'Languages & Frameworks',
                items: 'Java, Spring Boot, TypeScript, JavaScript, Python, React, Next.js, Node.js',
              },
              {
                label: 'Infrastructure & Data',
                items: 'AWS, Docker, Terraform, Kafka, Nomad, PostgreSQL, dbt, GraphQL',
              },
              {
                label: 'Tools & Platforms',
                items: 'Git, Supabase, Hasura, Vercel, Linux, CI/CD',
              },
            ].map(({ label, items }) => (
              <div key={label}>
                <p className="text-xs font-medium mb-1.5">{label}</p>
                <p className="text-sm text-muted-foreground">{items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Education</h2>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium">Bachelor of Engineering in Computer Science</p>
              <p className="text-sm text-muted-foreground">Nitte Meenakshi Institute of Technology, Bangalore</p>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0 mt-0.5">Aug 2020 – July 2024</span>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Projects</h2>
          <div className="space-y-4">
            {[
              {
                name: 'Orqys',
                desc: 'AI-native engineering ops layer converting tickets into production-ready PRs via multi-agent orchestration',
              },
              {
                name: 'Wispr Flow',
                desc: 'Local-first voice-to-text system for macOS with on-device LLM rewriting using Apple MLX',
              },
              {
                name: 'Synapse',
                desc: 'Semantic search and relationship-mapping engine over personal networks using natural language',
              },
              {
                name: 'Neploy',
                desc: 'One-click deployment platform abstracting infrastructure, CI/CD, and runtime config on AWS + Docker',
              },
            ].map(({ name, desc }) => (
              <div key={name}>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
