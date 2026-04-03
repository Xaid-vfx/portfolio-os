import { Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    id: '1',
    role: 'Software Engineer',
    company: 'Absinthe Labs',
    location: 'NYC, US (Remote)',
    period: 'Oct 2025 - Present',
    what_i_owned:
      'End-to-end ownership of the core campaign and incentives platform - distributed backends, identity verification infrastructure, and high-throughput data pipelines powering enterprise Web3 engagement programs.',
    what_i_built: [
      'Distributed ingestion systems processing millions of user submissions with concurrency-safe pipelines, rate limiting, and moderation workflows that handled traffic spikes without breaking',
      'dbt transformation models powering campaign points and incentive systems - large-scale data cleanup and pipeline failure resolution across millions of rows of user activity data',
      'AI-powered website generator and a reputation-based identity verification system using non-transferable NFTs',
    ],
    interesting_problems: [
      'Reduced infrastructure costs from $300/day to $500/month (94% reduction) by containerizing services and redesigning deployment architecture',
      'Debugged distributed cache inconsistencies across production workloads - the kind of bug where everything looks fine on paper but users see stale data',
      'Optimized inbound/outbound APIs and database queries to eliminate bottlenecks in a system serving enterprise-scale traffic',
    ],
    stack: ['TypeScript', 'Node.js', 'React', 'Next.js', 'GraphQL', 'Hasura', 'PostgreSQL', 'dbt', 'Docker', 'AWS'],
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'IG Group',
    location: 'Bangalore, India',
    period: 'Sept 2024 - Sept 2025',
    what_i_owned:
      'Cloud migration of legacy on-prem trading systems and real-time data synchronization infrastructure for 350k+ active traders.',
    what_i_built: [
      'Migrated on-prem Spring Boot systems to AWS using Terraform - Lambda, DynamoDB, S3, SES - achieving 35% cost reduction with 99.99% uptime and sub-50ms query latency',
      'Distributed Kafka pipelines and WebSocket services synchronizing real-time trading data between cloud and on-prem systems, reducing manual data handoffs by 80%',
      'Spring Boot microservices on Nomad processing 10k+ Kafka events daily with zero downtime, including integrations with ProRealTime and TradingView',
    ],
    interesting_problems: [
      'Designing the cloud↔on-prem sync layer where eventual consistency meets financial data that needs to be exact',
      'Third-party trading platform integrations where APIs are poorly documented and failure modes are discovered in production',
      'Building reliable event processing at scale where a dropped message means a trader sees wrong positions',
    ],
    stack: ['Spring Boot', 'Java', 'Node.js', 'Kafka', 'AWS', 'Terraform', 'TypeScript', 'Nomad', 'Docker'],
  },
  {
    id: '3',
    role: 'Co-founder & Engineering Lead',
    company: 'Bloom',
    location: 'London, UK (Remote)',
    period: 'Dec 2023 - Aug 2024',
    what_i_owned:
      'Architecture and engineering for a multi-tenant apprenticeship platform serving African markets. Everything from database design to payment integration to real-time messaging.',
    what_i_built: [
      'Multi-tenant backend with Supabase RLS, PostgreSQL triggers, and serverless functions enforcing fine-grained access control across mentors, apprentices, and organizations',
      'Real-time messaging system using Supabase Realtime and PostgreSQL LISTEN/NOTIFY for low-latency cohort communication',
      'Paystack Split Payments integration automating apprentice-to-mentor payouts with compliant fee extraction',
    ],
    interesting_problems: [
      'Onboarding users with varying technical literacy - 12 iterations to reach 70% completion rate',
      'Payment compliance across different African markets with different regulatory requirements',
      'Row-level security policies that are simple enough to audit but flexible enough to handle complex org hierarchies',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
  },
  {
    id: '4',
    role: 'Full Stack Developer',
    company: 'Graviti',
    location: 'Remote',
    period: 'Oct 2022 - Dec 2023',
    what_i_owned:
      'Real-time logistics tracking platform - live vehicle tracking, order status synchronization, and cross-device document rendering for manufacturers and transporters.',
    what_i_built: [
      'Real-time order tracking on Google Maps with WebSocket-powered status updates and geolocation sync across distributed logistics workflows',
      'Backend REST APIs in Node.js synchronizing live location and order status between transporters, manufacturers, and internal dashboards',
      'Custom in-browser PDF and image viewer using React and PDF.js for cross-device receipt and order confirmation rendering',
    ],
    interesting_problems: [
      'GPS accuracy in rural India - signals drop, connectivity is intermittent, and devices report impossible positions',
      'Building a smoothing algorithm that interpolates vehicle positions during signal gaps without showing teleportation',
      'Cross-device PDF rendering consistency where browser defaults fail on mobile',
    ],
    stack: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS', 'Node.js', 'REST API'],
  },
]

export default function ExperiencePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-xl font-semibold mb-1">Experience</h1>
        <p className="text-sm text-muted-foreground">Systems built, problems solved, infrastructure shipped.</p>
      </div>

      <div className="space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-6 border-l border-border">
            <div className="absolute left-0 top-1 w-2 h-2 -translate-x-[5px] rounded-full bg-foreground" />

            <div className="mb-4">
              <h3 className="font-medium">{exp.role}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm font-medium">{exp.company}</span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">What I Owned</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.what_i_owned}</p>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">What I Built</h4>
                <ul className="space-y-1.5">
                  {exp.what_i_built.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Interesting Problems</h4>
                <ul className="space-y-1.5">
                  {exp.interesting_problems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-accent text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
