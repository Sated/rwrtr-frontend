import dynamic from 'next/dynamic'
import { type ForwardedRef } from 'react'
import { type HtmlToMarkdownProps } from '@/components/HtmlToMarkdown/HtmlToMarkdown'

interface HtmlToMarkdownPropsExtended extends HtmlToMarkdownProps {
  forwardedRef?: ForwardedRef<HTMLDivElement>
}

export const HtmlToMarkdownDynamic = dynamic(
  async () => {
    const { HtmlToMarkdown } = await import('@/components/HtmlToMarkdown/HtmlToMarkdown')
    return ({
      forwardedRef,
      ...props
    }: HtmlToMarkdownPropsExtended) => <HtmlToMarkdown {...props} />
  },
  { ssr: false },
)