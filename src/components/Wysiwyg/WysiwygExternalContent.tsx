import { ActionIcon, Fieldset, Flex, rem, Tooltip } from '@mantine/core'
import { IconCopy, IconCopyCheck } from '@tabler/icons-react'
import { useClipboard } from '@mantine/hooks'
import { useTranslation } from 'next-i18next'

export interface WysiwygExternalContentProps{
  title: string
  content: string
}

export function WysiwygExternalContent({ title, content }: WysiwygExternalContentProps) {
  const { t } = useTranslation("common");
  const clipboard = useClipboard({ timeout: 1000 })

  return (
    <Fieldset legend={title} mb={rem(16)} mx={'md'}>
      <Flex style={{ justifyContent: 'space-between' }}>
        <div className="content">{content}</div>
        <Tooltip label={clipboard.copied ? t('wysiwyg.copied') : t('wysiwyg.copy')}>
          <ActionIcon size="lg" onClick={() => clipboard.copy(content)}>
            {clipboard.copied ? (
              <IconCopyCheck style={{ width: rem(18), height: rem(18) }} stroke={2} />
            ) : (
              <IconCopy style={{ width: rem(18), height: rem(18) }} stroke={2} />
            )}
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Fieldset>
  )
}