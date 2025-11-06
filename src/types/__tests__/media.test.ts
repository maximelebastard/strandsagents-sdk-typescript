import { describe, it, expect } from 'vitest'
import { ImageBlock, VideoBlock } from '../media.js'

describe('ImageBlock', () => {
  describe('when created with bytes source', () => {
    it('creates image block with correct properties', () => {
      const bytes = new Uint8Array([1, 2, 3])
      const block = new ImageBlock({
        format: 'jpeg',
        source: { bytes },
      })

      expect(block.type).toBe('imageBlock')
      expect(block.format).toBe('jpeg')
      expect(block.source).toEqual({ bytes })
      expect(block.detail).toBeUndefined()
    })
  })

  describe('when created with URL source', () => {
    it('creates image block with correct properties', () => {
      const block = new ImageBlock({
        format: 'png',
        source: { url: 's3://bucket/image.png' },
      })

      expect(block.type).toBe('imageBlock')
      expect(block.format).toBe('png')
      expect(block.source).toEqual({ url: 's3://bucket/image.png' })
    })
  })

  describe('when created with detail option', () => {
    it('includes detail property', () => {
      const block = new ImageBlock({
        format: 'webp',
        source: { bytes: new Uint8Array([]) },
        detail: 'high',
      })

      expect(block.detail).toBe('high')
    })
  })

  describe('when created with all image formats', () => {
    it('accepts png format', () => {
      const block = new ImageBlock({
        format: 'png',
        source: { bytes: new Uint8Array([]) },
      })
      expect(block.format).toBe('png')
    })

    it('accepts jpeg format', () => {
      const block = new ImageBlock({
        format: 'jpeg',
        source: { bytes: new Uint8Array([]) },
      })
      expect(block.format).toBe('jpeg')
    })

    it('accepts gif format', () => {
      const block = new ImageBlock({
        format: 'gif',
        source: { bytes: new Uint8Array([]) },
      })
      expect(block.format).toBe('gif')
    })

    it('accepts webp format', () => {
      const block = new ImageBlock({
        format: 'webp',
        source: { bytes: new Uint8Array([]) },
      })
      expect(block.format).toBe('webp')
    })
  })
})

describe('VideoBlock', () => {
  describe('when created with bytes source', () => {
    it('creates video block with correct properties', () => {
      const bytes = new Uint8Array([1, 2, 3])
      const block = new VideoBlock({
        format: 'mp4',
        source: { bytes },
      })

      expect(block.type).toBe('videoBlock')
      expect(block.format).toBe('mp4')
      expect(block.source).toEqual({ bytes })
    })
  })

  describe('when created with URL source', () => {
    it('creates video block with correct properties', () => {
      const block = new VideoBlock({
        format: 'webm',
        source: { url: 's3://bucket/video.webm' },
      })

      expect(block.type).toBe('videoBlock')
      expect(block.format).toBe('webm')
      expect(block.source).toEqual({ url: 's3://bucket/video.webm' })
    })
  })

  describe('when created with all video formats', () => {
    const formats: Array<'mkv' | 'mov' | 'mp4' | 'webm' | 'flv' | 'mpeg' | 'mpg' | 'wmv' | '3gp'> = [
      'mkv',
      'mov',
      'mp4',
      'webm',
      'flv',
      'mpeg',
      'mpg',
      'wmv',
      '3gp',
    ]

    formats.forEach((format) => {
      it(`accepts ${format} format`, () => {
        const block = new VideoBlock({
          format,
          source: { bytes: new Uint8Array([]) },
        })
        expect(block.format).toBe(format)
      })
    })
  })
})
