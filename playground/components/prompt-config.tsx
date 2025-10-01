"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
)

interface PromptConfigProps {
  onSendMessage: (prompt: string, systemPrompt: string) => void
  isLoading: boolean
  onClearChat: () => void
}

export function PromptConfig({ onSendMessage, isLoading, onClearChat }: PromptConfigProps) {
  const [prompt, setPrompt] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("你是一个有帮助的AI助手，请用简洁、准确的方式回答用户的问题。")

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading) {
      onSendMessage(prompt, systemPrompt)
      setPrompt("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <aside className="flex w-96 flex-col border-r border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">提示词配置</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt" className="text-sm font-medium">
              系统提示词
            </Label>
            <Textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="设置系统提示词..."
              className="min-h-24 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-prompt" className="text-sm font-medium">
              用户提示词
            </Label>
            <Textarea
              id="user-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的问题... (Enter 发送, Shift+Enter 换行)"
              className="min-h-32 resize-none"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!prompt.trim() || isLoading} className="flex-1 gap-2">
              <SendIcon />
              {isLoading ? "发送中..." : "发送"}
            </Button>
            <Button onClick={onClearChat} variant="outline" size="icon" title="清空对话">
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-2 rounded-lg bg-muted p-4 text-sm">
        <h3 className="font-medium text-muted-foreground">快捷键</h3>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Enter: 发送消息</li>
          <li>• Shift + Enter: 换行</li>
          <li>• 点击顶部设置图标配置模型参数</li>
        </ul>
      </div>
    </aside>
  )
}
