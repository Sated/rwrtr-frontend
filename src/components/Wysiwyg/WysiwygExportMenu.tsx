import { ActionIcon, Loader, Menu, type MenuProps, Modal } from '@mantine/core'
import { type Editor } from '@tiptap/react'
import {
  IconCopy,
  IconCopyCheck,
  IconDownload,
  IconFileTypeDocx,
  IconFileTypeHtml,
  IconMarkdown,
  IconCheck,
} from '@tabler/icons-react'
import { useClipboard, useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'next-i18next'
import { Suspense, useState } from 'react'
import { showError } from '@/utils/notifications'
import { api } from '@/utils/api'
import { HtmlToMarkdownDynamic } from '@/components/HtmlToMarkdown/HtmlToMarkdownDynamic'

type WysiwygExportMenuProps = Omit<MenuProps, 'children' | 'trigger'> & { btnClassName?: string; editor: Editor }

export function WysiwygExportMenu({ editor, btnClassName, ...props }: WysiwygExportMenuProps) {
  const { t } = useTranslation('common')
  const clipboard = useClipboard({ timeout: 1000 })
  const [exportLoading, setExportLoading] = useState(false)
  const [markdownModalOpened, { open: openMarkdownModal, close: closeMarkdownModal }] = useDisclosure(false);

  const convertHtmlToDocxMutation = api.content.convertHtmlToDocx.useMutation({
    onSuccess(data) {
      const blob = new Blob([new Uint8Array(data.data ?? [])], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'file.docx'
      link.click()
    },
    onError(err) {
      const zodFieldErrors = err?.data?.zodError?.fieldErrors

      if (typeof zodFieldErrors === 'object') {
        for (const fieldName in zodFieldErrors) {
          showError(zodFieldErrors[fieldName]?.[0] ?? t('status.unknownError'))
        }
      }
    },
  })

  async function saveAsDocx() {
    try {
      setExportLoading(true)
      await convertHtmlToDocxMutation.mutateAsync({
        content: editor.getHTML(),
      })
    } catch (e) {
      showError(`${t('wysiwyg.saveFileError')}: ${e?.toString() ?? t('status.unknownError')}`)
    } finally {
      setExportLoading(false)
    }
  }

  async function saveAsHtml() {
    try {
      setExportLoading(true)
      const { prettify } = await import('htmlfy')
      const link = document.createElement('a')
      link.download = 'file.html'
      link.href = `data:text/plain,${encodeURIComponent(prettify(editor.getHTML()))}`
      link.click()
    } catch (e) {
      showError(`${t('wysiwyg.saveFileError')}: ${e?.toString() ?? t('status.unknownError')}`)
    } finally {
      setExportLoading(false)
    }
  }

  return (
    <>
      <Modal opened={markdownModalOpened} onClose={closeMarkdownModal} title="Markdown" centered size="calc(100vw - 3rem)">
        <Suspense fallback={<Loader size="lg" />}>
          <HtmlToMarkdownDynamic html={editor.getHTML()} />
        </Suspense>
      </Modal>

      <Menu disabled={exportLoading} position="top-end" trigger="click-hover" openDelay={100} closeDelay={400} {...props}>
        <Menu.Target>
          <ActionIcon size="xl" className={btnClassName}>
            {clipboard.copied ? <IconCheck /> : exportLoading ? <Loader size="sm" color="white" /> : <IconDownload />}
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconMarkdown />}
            onClick={openMarkdownModal}
          >
            {t('wysiwyg.convertTo', { format: 'Markdown' })}
          </Menu.Item>
          <Menu.Item
            leftSection={<IconFileTypeHtml />}
            onClick={saveAsHtml}
          >
            {t('wysiwyg.saveFile', { format: 'HTML' })}
          </Menu.Item>
          <Menu.Item
            leftSection={<IconFileTypeDocx />}
            onClick={saveAsDocx}
          >
            {t('wysiwyg.saveFile', { format: 'DOCX' })}
          </Menu.Item>
          <Menu.Item
            leftSection={clipboard.copied ? <IconCopyCheck /> : <IconCopy />}
            onClick={() => clipboard.copy(editor.getHTML())}
          >
            {t('wysiwyg.copyHTML')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
