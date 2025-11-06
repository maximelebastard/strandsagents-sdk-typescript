/**
 * Media content types for images and videos.
 *
 * This module defines types for image and video content blocks that can be
 * included in messages. Media sources support multiple formats to accommodate
 * different providers (Bedrock, OpenAI).
 */

/**
 * Image format type.
 * Supported formats for image content.
 */
export type ImageFormat = 'png' | 'jpeg' | 'gif' | 'webp'

/**
 * Source for an image.
 * Supports multiple formats for different providers:
 * - bytes: Raw binary data (Bedrock)
 * - url: URL reference - s3:// (Bedrock), https:// or data: (OpenAI, future)
 */
export type ImageSource = { bytes: Uint8Array } | { url: string }

/**
 * Data for an image block.
 */
export interface ImageBlockData {
  /**
   * Image format type.
   */
  format: ImageFormat

  /**
   * Source for the image data.
   */
  source: ImageSource

  /**
   * Optional quality setting for image processing.
   * OpenAI-specific feature for controlling image analysis detail.
   */
  detail?: 'low' | 'high' | 'auto'
}

/**
 * Image content block within a message.
 * Supports images from various sources including binary data and URLs.
 */
export class ImageBlock implements ImageBlockData {
  /**
   * Discriminator for image content.
   */
  readonly type = 'imageBlock' as const

  /**
   * Image format type.
   */
  readonly format: ImageFormat

  /**
   * Source for the image data.
   */
  readonly source: ImageSource

  /**
   * Optional quality setting for image processing.
   * OpenAI-specific feature for controlling image analysis detail.
   */
  readonly detail?: 'low' | 'high' | 'auto'

  constructor(data: ImageBlockData) {
    this.format = data.format
    this.source = data.source
    if (data.detail !== undefined) {
      this.detail = data.detail
    }
  }
}

/**
 * Video format type.
 * Supported formats for video content.
 */
export type VideoFormat = 'mkv' | 'mov' | 'mp4' | 'webm' | 'flv' | 'mpeg' | 'mpg' | 'wmv' | '3gp'

/**
 * Source for a video.
 * Supports multiple formats for different providers:
 * - bytes: Raw binary data up to 25MB when base64-encoded (Bedrock)
 * - url: URL reference - s3:// up to 1GB (Bedrock)
 */
export type VideoSource = { bytes: Uint8Array } | { url: string }

/**
 * Data for a video block.
 */
export interface VideoBlockData {
  /**
   * Video format type.
   */
  format: VideoFormat

  /**
   * Source for the video data.
   */
  source: VideoSource
}

/**
 * Video content block within a message.
 * Supports videos from various sources including binary data and URLs.
 */
export class VideoBlock implements VideoBlockData {
  /**
   * Discriminator for video content.
   */
  readonly type = 'videoBlock' as const

  /**
   * Video format type.
   */
  readonly format: VideoFormat

  /**
   * Source for the video data.
   */
  readonly source: VideoSource

  constructor(data: VideoBlockData) {
    this.format = data.format
    this.source = data.source
  }
}
