import { useState, useRef, useEffect, useCallback } from 'react'
import './index.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const SUGGESTIONS = [
  'What is Spring Boot?',
  'What is MongoDB?',
  'What is LangChain?',
  'How does RAG work?',
]

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  /* Toggle theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  /* Clear error after 4s */
  useEffect(() => {
    if (!error) return
    const t = setTimeout(() => setError(null), 4000)
    return () => clearTimeout(t)
  }, [error])

  /* Auto-resize textarea */
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
  }, [input])

  const sendQuestion = useCallback(async (questionText) => {
    const question = (questionText || input).trim()
    if (!question || loading) return

    setInput('')
    setMessages(prev => [
      ...prev,
      { role: 'user', text: question, time: new Date() },
    ])
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: data.answer, time: new Date() },
      ])
    } catch (err) {
      setError(err.message || 'Failed to connect to the backend.')
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          text: '⚠️ Could not reach the backend. Make sure the FastAPI server is running on port 8000.',
          time: new Date(),
          isError: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendQuestion()
    }
  }

  const handleSuggestion = (text) => {
    setInput(text)
    textareaRef.current?.focus()
  }

  return (
    <div className="app">
      {/* ── Navbar ── */}
      <header className="header">
        <div className="header-brand">
          <div className="header-logo">🧠</div>
          <span className="header-title">RAG Assistant</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <span className="header-badge">LangChain · FAISS · Gemini</span>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="main-container">
        {/* Hero */}
        <section className="hero">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Retrieval Augmented Generation
          </div>
          <h1>Ask Your Documents</h1>
          <p className="hero-sub">
            Powered by LangChain, FAISS vector search, and OpenAI — get precise answers
            grounded in your knowledge base.
          </p>
          <div className="hero-chips">
            <span className="chip"><span className="chip-icon">🔗</span> LangChain</span>
            <span className="chip"><span className="chip-icon">🗄️</span> FAISS Vector DB</span>
            <span className="chip"><span className="chip-icon">✨</span> GPT-4o-mini</span>
            <span className="chip"><span className="chip-icon">⚡</span> FastAPI</span>
          </div>
        </section>

        {/* Chat Window */}
        <div className="chat-window">
          {/* Window Chrome */}
          <div className="chat-header">
            <div className="chat-header-lights">
              <span className="chat-light red" />
              <span className="chat-light yellow" />
              <span className="chat-light green" />
            </div>
            <span className="chat-header-label">rag-assistant — session</span>
          </div>

          {/* Messages */}
          <div className="messages-list">
            {messages.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <p>No messages yet.<br />Ask a question about your knowledge base.</p>
                <div className="empty-suggestions">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      className="suggestion-btn"
                      onClick={() => handleSuggestion(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role === 'user' ? 'user' : 'ai'}`}>
                <div className={`avatar ${msg.role === 'user' ? 'user-av' : 'ai'}`}>
                  {msg.role === 'ai' ? '🧠' : '👤'}
                </div>
                <div className={`bubble ${msg.isError ? 'error-bubble' : ''}`}>
                  {msg.text}
                  <span className="bubble-time">{formatTime(msg.time)}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="message ai">
                <div className="avatar ai">🧠</div>
                <div className="typing-bubble">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="input-area">
            <div className="input-form">
              <textarea
                ref={textareaRef}
                id="chat-input"
                className="chat-input"
                placeholder="Ask a question about your documents…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
                aria-label="Chat input"
              />
              <button
                id="send-btn"
                className="send-btn"
                onClick={() => sendQuestion()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <p className="input-hint">
              Press <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="info-panel">
          <div className="info-card">
            <div className="info-card-icon">🗄️</div>
            <div className="info-card-label">Vector Store</div>
            <div className="info-card-value">FAISS (local)</div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🤖</div>
            <div className="info-card-label">LLM Model</div>
            <div className="info-card-value">GPT-4o-mini</div>
          </div>
          <div className="info-card">
            <div className="info-card-icon">🔗</div>
            <div className="info-card-label">Chain Type</div>
            <div className="info-card-value">RetrievalQA</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        Built with ❤️ using LangChain · FAISS · FastAPI · Vite React
      </footer>

      {/* Error Toast */}
      {error && (
        <div className="error-toast" role="alert">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}

export default App
