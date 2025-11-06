/**
 * Main entry point for the Strands Agents TypeScript SDK.
 *
 * This is the primary export module for the SDK, providing access to all
 * public APIs and functionality.
 */

// Error types
export { ContextWindowOverflowError, MaxTokensError } from './errors.js'

// JSON types
export type { JSONSchema, JSONValue } from './types/json.js'

// Message types
export type {
  Role,
  StopReason,
  TextBlockData,
  ToolUseBlockData,
  ToolResultBlockData,
  ReasoningBlockData,
  CachePointBlockData,
  ContentBlock,
  ContentBlockData,
  MessageData,
  SystemPrompt,
  SystemContentBlock,
  JsonBlock,
  ToolResultContent,
} from './types/messages.js'

// Message classes
export { TextBlock, ToolUseBlock, ToolResultBlock, ReasoningBlock, CachePointBlock, Message } from './types/messages.js'

// Media types
export type {
  ImageFormat,
  ImageSource,
  ImageBlockData,
  VideoFormat,
  VideoSource,
  VideoBlockData,
} from './types/media.js'

// Media classes
export { ImageBlock, VideoBlock } from './types/media.js'

// Document types
export type {
  DocumentFormat,
  DocumentSource,
  DocumentContentBlock,
  DocumentBlockData,
  CitationsConfig,
} from './types/documents.js'

// Document classes
export { DocumentBlock } from './types/documents.js'

// Citation types
export type {
  CitationLocation,
  CitationSourceContent,
  CitationGeneratedContent,
  Citation,
  CitationsContentBlockData,
} from './types/citations.js'

// Citation classes
export { CitationsContentBlock } from './types/citations.js'

// Guardrail types
export type { GuardQualifier, GuardContentText, GuardContentBlockData } from './types/guardrails.js'

// Guardrail classes
export { GuardContentBlock } from './types/guardrails.js'

// Tool types
export type { ToolSpec, ToolUse, ToolResultStatus, ToolResult, ToolChoice } from './tools/types.js'

// Tool interface and related types
export type { Tool, InvokableTool, ToolContext, ToolStreamEvent, ToolStreamGenerator } from './tools/tool.js'

// FunctionTool implementation
export { FunctionTool } from './tools/function-tool.js'

// Tool factory function
export { tool } from './tools/zod-tool.js'

// ToolRegistry implementation
export { ToolRegistry } from './tools/registry.js'

// Streaming event types
export type {
  Usage,
  Metrics,
  ModelMessageStartEvent,
  ToolUseStart,
  ContentBlockStart,
  ModelContentBlockStartEvent,
  TextDelta,
  ToolUseInputDelta,
  ReasoningContentDelta,
  ContentBlockDelta,
  ModelContentBlockDeltaEvent,
  ModelContentBlockStopEvent,
  ModelMessageStopEvent,
  ModelMetadataEvent,
  ModelStreamEvent,
} from './models/streaming.js'

// Model provider types
export type { BaseModelConfig, StreamOptions, Model } from './models/model.js'

// Bedrock model provider
export { BedrockModel as BedrockModel } from './models/bedrock.js'
export type { BedrockModelConfig, BedrockModelOptions } from './models/bedrock.js'

// Agent streaming event types
export type {
  AgentStreamEvent,
  BeforeModelEvent,
  AfterModelEvent,
  BeforeToolsEvent,
  AfterToolsEvent,
  BeforeInvocationEvent,
  AfterInvocationEvent,
} from './agent/streaming.js'

// Agent result type

export type { AgentResult } from './types/agent.js'
