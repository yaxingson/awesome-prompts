"use client"

import { useState } from "react"
import { ModelSelector } from "@/components/model-selector"
import { PromptConfig } from "@/components/prompt-config"
import { ChatDisplay } from "@/components/chat-display"

export type ModelProvider = "GPT" | "Claude" | "Gemini" | "Grok" | "LLama" | "Deepseek" | "Qwen"

export interface ModelConfig {
  temperature: number
  maxTokens: number
  topP: number
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<ModelProvider>("GPT")
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1,
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (prompt: string, systemPrompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel,
          config: modelConfig,
          systemPrompt,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        model: selectedModel,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，发生了错误。请稍后重试。",
        timestamp: new Date(),
        model: selectedModel,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        modelConfig={modelConfig}
        onConfigChange={setModelConfig}
      />

      <div className="flex flex-1 overflow-hidden">
        <PromptConfig onSendMessage={handleSendMessage} isLoading={isLoading} onClearChat={handleClearChat} />
        <ChatDisplay messages={messages} isLoading={isLoading} />
      </div>
    </div>
  )
}
