import TurndownService from 'turndown'
import { useEffect, useState } from 'react'
import { ActionIcon, Code, rem, Tooltip } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { IconCopy, IconCopyCheck } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

import s from './HtmlToMarkdown.module.scss'

export interface HtmlToMarkdownProps {
  html: string
}

export function HtmlToMarkdown({ html }: HtmlToMarkdownProps) {
  const { t } = useTranslation('common')
  const clipboard = useClipboard({ timeout: 1000 })
  const [markdown, setMarkdown] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const turndownService = new TurndownService()

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      setMarkdown(turndownService.turndown(html))
    } catch (e) {
      setMarkdown('')
    }
  }, [html])

  return (
    <div className={s.wrapper}>
      <Code block>{markdown || ''}</Code>

      <Tooltip label={clipboard.copied ? t('wysiwyg.copied') : t('wysiwyg.copy')}>
        <ActionIcon className={s.copyBtn} size="lg" onClick={() => clipboard.copy(markdown)}>
          {clipboard.copied ? (
            <IconCopyCheck style={{ width: rem(18), height: rem(18) }} stroke={2} />
          ) : (
            <IconCopy style={{ width: rem(18), height: rem(18) }} stroke={2} />
          )}
        </ActionIcon>
      </Tooltip>
    </div>
  )
}
