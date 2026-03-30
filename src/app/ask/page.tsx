'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { VoiceInput } from '@/components/voice-input'
import { StreamingText } from '@/components/streaming-text'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi. Ask me anything about Mohd Zaid's projects, technical decisions, or approach to building software.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          fullText += decoder.decode(value)
          setMessages((prev) => {
            const next = [...prev]
            next[next.length - 1] = { role: 'assistant', content: fullText }
            return next
          })
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col h-full" style={{ minHeight: 'calc(100vh - 48px)' }}>
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1">Ask AI</h1>
        <p className="text-sm text-muted-foreground">
          Ask about projects, technical decisions, or engineering approach.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 mb-6 min-h-0">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className="w-5 h-5 rounded bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                <span className="text-background text-[10px] font-bold leading-none">Z</span>
              </div>
            )}
            <div
              className={`max-w-[80%] text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-accent px-3 py-2 rounded-lg'
                  : 'text-foreground'
              }`}
            >
              {message.role === 'assistant' && index === messages.length - 1 && isLoading ? (
                <StreamingText
                  text={message.content}
                  className="text-sm leading-relaxed"
                />
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border pt-4">
        <VoiceInput onTranscript={(text) => setInput(text)} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-3 py-2 rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-border text-sm placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 rounded bg-foreground text-background disabled:opacity-40 transition-opacity hover:opacity-80"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  )
}
