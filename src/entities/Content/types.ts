import { type z } from 'zod'
import {
  type aiConversationRequestSchema,
  type convertHtmltoDocxRequestSchema,
  type createRequestSchema
} from '@/entities/Content/schema'

export interface Content {
  title: string
  description: string
  content: string
}

export interface TranslatedContent {
  translatedTitle: string
  translatedDescription: string
  translatedContent: string
}

export interface ContentLanguages {
  sourceLanguage?: string
  targetLanguage?: string
}

export interface ContentWithTranslation extends Content, TranslatedContent, ContentLanguages { }

export type createRequestInput = z.TypeOf<typeof createRequestSchema>

export type convertHtmltoDocxRequestInput = z.TypeOf<typeof convertHtmltoDocxRequestSchema>
export interface convertHtmltoDocxOutput {
  type: string,
  data: ArrayBufferLike | null
}

export type aiConversationRequestInput = z.TypeOf<typeof aiConversationRequestSchema>
export type aiConversationOutput = string