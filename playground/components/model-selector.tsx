"use client"

import type { ModelProvider, ModelConfig } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const SettingsIcon = () => (
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
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const ChevronDownIcon = () => (
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
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const models: { value: ModelProvider; label: string; description: string }[] = [
  { value: "GPT", label: "GPT", description: "OpenAI GPT-4" },
  { value: "Claude", label: "Claude", description: "Anthropic Claude" },
  { value: "Gemini", label: "Gemini", description: "Google Gemini" },
  { value: "Grok", label: "Grok", description: "xAI Grok" },
  { value: "LLama", label: "LLama", description: "Meta LLama" },
  { value: "Deepseek", label: "Deepseek", description: "Deepseek AI" },
  { value: "Qwen", label: "Qwen", description: "Alibaba Qwen" },
]

interface ModelSelectorProps {
  selectedModel: ModelProvider
  onModelChange: (model: ModelProvider) => void
  modelConfig: ModelConfig
  onConfigChange: (config: ModelConfig) => void
}

export function ModelSelector({ selectedModel, onModelChange, modelConfig, onConfigChange }: ModelSelectorProps) {
  const currentModel = models.find((m) => m.value === selectedModel)

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-foreground">多模型 AI 对话</h1>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              {currentModel?.label}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">选择模型</h4>
              <div className="grid gap-2">
                {models.map((model) => (
                  <button
                    key={model.value}
                    onClick={() => onModelChange(model.value)}
                    className={`flex flex-col items-start rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                      selectedModel === model.value ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                    }`}
                  >
                    <span className="font-medium">{model.label}</span>
                    <span className="text-xs opacity-80">{model.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <SettingsIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">模型配置</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature" className="text-sm">
                  Temperature
                </Label>
                <span className="text-sm text-muted-foreground">{modelConfig.temperature}</span>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={[modelConfig.temperature]}
                onValueChange={([value]) => onConfigChange({ ...modelConfig, temperature: value })}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="maxTokens" className="text-sm">
                  Max Tokens
                </Label>
                <span className="text-sm text-muted-foreground">{modelConfig.maxTokens}</span>
              </div>
              <Slider
                id="maxTokens"
                min={256}
                max={4096}
                step={256}
                value={[modelConfig.maxTokens]}
                onValueChange={([value]) => onConfigChange({ ...modelConfig, maxTokens: value })}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="topP" className="text-sm">
                  Top P
                </Label>
                <span className="text-sm text-muted-foreground">{modelConfig.topP}</span>
              </div>
              <Slider
                id="topP"
                min={0}
                max={1}
                step={0.1}
                value={[modelConfig.topP]}
                onValueChange={([value]) => onConfigChange({ ...modelConfig, topP: value })}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  )
}
