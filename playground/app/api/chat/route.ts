import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages, model, config } = await req.json()

    // 模拟 AI 响应 - 在实际应用中，这里会调用真实的 AI API
    // 根据不同的模型调用不同的 API
    const modelResponses: Record<string, string> = {
      GPT: "这是来自 GPT 模型的响应。GPT 是 OpenAI 开发的大型语言模型，擅长理解和生成自然语言。",
      Claude: "这是来自 Claude 模型的响应。Claude 是 Anthropic 开发的 AI 助手，注重安全性和有用性。",
      Gemini: "这是来自 Gemini 模型的响应。Gemini 是 Google 开发的多模态 AI 模型。",
      Grok: "这是来自 Grok 模型的响应。Grok 是 xAI 开发的 AI 模型，具有实时信息访问能力。",
      LLama: "这是来自 LLama 模型的响应。LLama 是 Meta 开发的开源大型语言模型。",
      Deepseek: "这是来自 Deepseek 模型的响应。Deepseek 是一个强大的中文 AI 模型。",
      Qwen: "这是来自 Qwen 模型的响应。Qwen 是阿里巴巴开发的通义千问大模型。",
    }

    // 获取最后一条用户消息
    const lastMessage = messages[messages.length - 1]
    const userPrompt = lastMessage?.content || ""

    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 返回模拟响应
    const response = {
      content: `${modelResponses[model] || "未知模型响应"}\n\n您的问题是: "${userPrompt}"\n\n当前配置:\n- Temperature: ${config.temperature}\n- Max Tokens: ${config.maxTokens}\n- Top P: ${config.topP}`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
