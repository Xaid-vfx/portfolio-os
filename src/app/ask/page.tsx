'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, Loader2 } from 'lucide-react'
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
      content: "Hi! I'm your AI companion. Ask me anything about Mohd Zaid's projects, technical decisions, or approach to building software.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
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
            const newMessages = [...prev]
            newMessages[newMessages.length - 1] = { role: 'assistant', content: fullText }
            return newMessages
          })
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'I encountered an error. Please try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceTranscript = (text: string) => {
    setInput(text)
  }

  return (
    <div className="h-full flex flex-col p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Ask AI</h1>
        </div>
        <p className="text-sm md:text-base text-muted-foreground">
          Have questions about Mohd Zaid&apos;s work, projects, or technical approach?
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 md:space-y-6 mb-4 md:mb-6 min-h-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[80%] px-3 md:px-4 py-2.5 md:py-3 rounded-xl ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent border border-border'
              }`}
            >
              {message.role === 'assistant' && index === messages.length - 1 && isLoading ? (
                <StreamingText text={message.content} className="text-xs md:text-sm leading-relaxed" />
              ) : (
                <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
        <VoiceInput onTranscript={handleVoiceTranscript} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
          ) : (
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      </form>
    </div>
  )
}
