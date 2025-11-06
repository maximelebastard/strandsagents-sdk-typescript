import { describe, expect, test } from 'vitest'
import {
  Message,
  TextBlock,
  ToolUseBlock,
  ToolResultBlock,
  ReasoningBlock,
  CachePointBlock,
  JsonBlock,
  type ContentBlock,
} from '../messages.js'
import { ImageBlock, VideoBlock } from '../media.js'
import { DocumentBlock } from '../documents.js'
import { CitationsContentBlock } from '../citations.js'
import { GuardContentBlock } from '../guardrails.js'

describe('Message', () => {
  test('creates message with role and content', () => {
    const content = [new TextBlock('test')]
    const message = new Message({ role: 'user', content })

    expect(message).toEqual({
      type: 'message',
      role: 'user',
      content,
    })
  })
})

describe('TextBlock', () => {
  test('creates text block with text', () => {
    const block = new TextBlock('hello')

    expect(block).toEqual({
      type: 'textBlock',
      text: 'hello',
    })
  })
})

describe('ToolUseBlock', () => {
  test('creates tool use block', () => {
    const block = new ToolUseBlock({
      name: 'test-tool',
      toolUseId: '123',
      input: { param: 'value' },
    })

    expect(block).toEqual({
      type: 'toolUseBlock',
      name: 'test-tool',
      toolUseId: '123',
      input: { param: 'value' },
    })
  })
})

describe('ToolResultBlock', () => {
  test('creates tool result block', () => {
    const block = new ToolResultBlock({
      toolUseId: '123',
      status: 'success',
      content: [{ type: 'textBlock', text: 'result' }],
    })

    expect(block).toEqual({
      type: 'toolResultBlock',
      toolUseId: '123',
      status: 'success',
      content: [{ type: 'textBlock', text: 'result' }],
    })
  })
})

describe('ReasoningBlock', () => {
  test('creates reasoning block with text', () => {
    const block = new ReasoningBlock({ text: 'thinking...' })

    expect(block).toEqual({
      type: 'reasoningBlock',
      text: 'thinking...',
    })
  })
})

describe('CachePointBlock', () => {
  test('creates cache point block', () => {
    const block = new CachePointBlock({ cacheType: 'default' })

    expect(block).toEqual({
      type: 'cachePointBlock',
      cacheType: 'default',
    })
  })
})

describe('JsonBlock', () => {
  test('creates json block', () => {
    const block = new JsonBlock({ json: { key: 'value' } })

    expect(block).toEqual({
      type: 'jsonBlock',
      json: { key: 'value' },
    })
  })
})

describe('ContentBlock union', () => {
  test('accepts ImageBlock', () => {
    const imageBlock: ContentBlock = new ImageBlock({
      format: 'jpeg',
      source: { bytes: new Uint8Array([]) },
    })
    expect(imageBlock.type).toBe('imageBlock')
  })

  test('accepts VideoBlock', () => {
    const videoBlock: ContentBlock = new VideoBlock({
      format: 'mp4',
      source: { bytes: new Uint8Array([]) },
    })
    expect(videoBlock.type).toBe('videoBlock')
  })

  test('accepts DocumentBlock', () => {
    const documentBlock: ContentBlock = new DocumentBlock({
      name: 'test.pdf',
      format: 'pdf',
      source: { bytes: new Uint8Array([]) },
    })
    expect(documentBlock.type).toBe('documentBlock')
  })

  test('accepts CitationsContentBlock', () => {
    const citationsBlock: ContentBlock = new CitationsContentBlock({
      citations: [],
      content: [],
    })
    expect(citationsBlock.type).toBe('citationsContentBlock')
  })

  test('accepts GuardContentBlock', () => {
    const guardBlock: ContentBlock = new GuardContentBlock({
      text: {
        qualifiers: ['query'],
        text: 'test',
      },
    })
    expect(guardBlock.type).toBe('guardContentBlock')
  })
})
