import { FileText, Download, Mail, Github, Linkedin, Phone, MapPin } from 'lucide-react'

export default function ResumePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Resume</h1>
        </div>
        <a
          href="/Zaid_CV-3.pdf"
          download
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      <div className="space-y-6 md:space-y-8">
        <section className="p-4 md:p-6 rounded-xl border border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Mohd Zaid</h2>
              <p className="text-muted-foreground">Full Stack Developer</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a href="mailto:mohdzaidweb@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                mohdzaidweb@gmail.com
              </a>
              <a href="tel:+918799664122" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 8799664122
              </a>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Lucknow, India
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="https://github.com/zaid-maker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
              github.com/zaid-maker
            </a>
            <a href="https://linkedin.com/in/itszaid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
              linkedin.com/in/itszaid
            </a>
          </div>
        </section>

        <section className="p-4 md:p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <p className="text-muted-foreground leading-relaxed">
            2+ years of experience in React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, AWS, and Docker. 
            Passionate about building scalable web applications with clean UI and excellent user experiences.
          </p>
        </section>

        <section className="p-4 md:p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            <div>
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium">Junior Software Developer</h3>
                  <p className="text-sm text-muted-foreground">Code Parallel</p>
                </div>
                <span className="text-sm text-muted-foreground">Oct 2023 - Present</span>
              </div>
              <ul className="space-y-1 mt-3 text-sm text-muted-foreground">
                <li>• Worked on 3 major projects and 7+ internal tools</li>
                <li>• Led AI integration into products using LangChain and OpenAI</li>
                <li>• Built enterprise applications with Next.js, React, TypeScript, and Python</li>
                <li>• Deployed solutions using AWS and Docker</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="p-4 md:p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Frontend</h3>
              <p className="text-sm text-muted-foreground">HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, TypeScript</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Backend</h3>
              <p className="text-sm text-muted-foreground">Node.js, Express.js, Python, FastAPI, PostgreSQL, MongoDB, Redis</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Tools & Cloud</h3>
              <p className="text-sm text-muted-foreground">Docker, Git, AWS, Figma, Linear, Jira</p>
            </div>
          </div>
        </section>

        <section className="p-4 md:p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Education</h2>
          <div className="flex flex-col md:flex-row md:items-start justify-between">
            <div>
              <h3 className="font-medium">B.Tech in Computer Science</h3>
              <p className="text-sm text-muted-foreground">Babu Banarasi Das University</p>
            </div>
            <span className="text-sm text-muted-foreground">2019 - 2023 | 76%</span>
          </div>
        </section>

        <section className="p-4 md:p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">RAG Chatbot</h3>
              <p className="text-sm text-muted-foreground mt-1">Enterprise-grade AI chatbot with RAG architecture using LangChain, OpenAI, and Next.js</p>
            </div>
            <div>
              <h3 className="font-medium">AI-Enhanced CRM</h3>
              <p className="text-sm text-muted-foreground mt-1">CRM with AI-powered lead scoring, prediction, and smart search</p>
            </div>
            <div>
              <h3 className="font-medium">Smart Contract Auditing Tool</h3>
              <p className="text-sm text-muted-foreground mt-1">Automated smart contract analysis using AI</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
