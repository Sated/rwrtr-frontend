import { z } from 'zod'
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_CONTENT_LENGTH, MAX_AI_CONTENT_LENGTH } from './constants'

// https://cloudlayer.io/blog/puppeteer-waituntil-options/
const waitUntilEnum = z.enum(['networkidle0', 'networkidle2', 'load', 'domcontentloaded'])

export const createRequestSchema = z.object({
  url: z.string().url(),
  withProxy: z.boolean().optional(),
  withJSRendering: z.boolean().optional(),
  waitUntil: waitUntilEnum.default('domcontentloaded'),
})

export const convertHtmltoDocxRequestSchema = z.object({
  title: z.string().max(MAX_TITLE_LENGTH).optional(),
  description: z.string().max(MAX_DESCRIPTION_LENGTH).optional(),
  content: z.string().max(MAX_CONTENT_LENGTH),
})

export const aiConversationTypesEnum = z.enum([
  'rewrite',
  'expand',
  'summarize',
  'rewrite-with-seo',
  'rephrase',
  'modify',
  'append',
])

export type AIConversationType = z.infer<typeof aiConversationTypesEnum>

export const aiConversationRequestSchema = z.object({
  type: aiConversationTypesEnum,
  language: z.string().optional(),
  content: z.string().max(MAX_AI_CONTENT_LENGTH),
})


