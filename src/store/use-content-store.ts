import { create } from 'zustand'
import type { ContentWithTranslation, Content, TranslatedContent, ContentLanguages } from '@/entities/Content/types'

export interface ContentState extends ContentWithTranslation {
  computed: {
    get hasTranslatedContent(): boolean
  }
}

export type ContentAction = {
  setContent: (content: Content) => void
  setContentLanguages: (languages: ContentLanguages) => void
  setTranslatedContent: (translatedContent: TranslatedContent) => void
  setContentWithTranslation: (contentWithTranslation: ContentWithTranslation) => void
}

export const useContentStore = create<ContentState & ContentAction>((set, get) => ({
  title: '',
  description: '',
  content: '',
  translatedTitle: '',
  translatedDescription: '',
  translatedContent: '',
  sourceLanguage: '',
  targetLanguage: '',
  computed: {
    get hasTranslatedContent() {
      return Boolean(get().content) && Boolean(get().translatedContent)
    },
  },
  setContent: (content) =>
    set(() => ({ title: content.title, description: content.description, content: content.content })),
  setTranslatedContent: (translatedContent) =>
    set(() => ({
      translatedTitle: translatedContent.translatedTitle,
      translatedDescription: translatedContent.translatedDescription,
      translatedContent: translatedContent.translatedContent,
    })),
  setContentLanguages: (languages) =>
    set(() => ({
      sourceLanguage: languages.sourceLanguage,
      targetLanguage: languages.targetLanguage,
    })),
  setContentWithTranslation: (contentWithTranslation) => set(() => {
    console.log({
      title: contentWithTranslation.title,
      description: contentWithTranslation.description,
      content: contentWithTranslation.content,
      translatedTitle: contentWithTranslation.translatedTitle,
      translatedDescription: contentWithTranslation.translatedDescription,
      translatedContent: contentWithTranslation.translatedContent,
    })
    return {
      title: contentWithTranslation.title,
      description: contentWithTranslation.description,
      content: contentWithTranslation.content,
      translatedTitle: contentWithTranslation.translatedTitle,
      translatedDescription: contentWithTranslation.translatedDescription,
      translatedContent: contentWithTranslation.translatedContent,
      sourceLanguage: contentWithTranslation.sourceLanguage,
      targetLanguage: contentWithTranslation.targetLanguage,
    }
  }),
}))
