import { LoadingOverlay, Menu, type MenuProps } from '@mantine/core'
import { BubbleMenu, type Editor } from '@tiptap/react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { showError } from '@/utils/notifications'
import { api } from '@/utils/api'
import getSelectedHtml, { GetSelectedHtmlReturn } from '@/components/Wysiwyg/extensions/GetSelectedHtml'
import { type AIConversationType } from '@/entities/Content/schema'
import { useContentStore } from '@/store/use-content-store'

type WysiwygAIBubbleMenuProps = Omit<MenuProps, 'children' | 'trigger'> & { btnClassName?: string; editor: Editor }

export function WysiwygAIBubbleMenu({ editor, ...props }: WysiwygAIBubbleMenuProps) {
  const { t } = useTranslation('common')
  const [isAILoading, setIsAILoading] = useState(false)
  const contentStore = useContentStore()

  const conversationMutation = api.content.getConversation.useMutation({
    // onSuccess(data) {},
    onError(err) {
      const zodFieldErrors = err?.data?.zodError?.fieldErrors

      if (typeof zodFieldErrors === 'object') {
        for (const fieldName in zodFieldErrors) {
          showError(zodFieldErrors[fieldName]?.[0] ?? t('status.unknownError'))
        }
      }
    },
  })

  // enum AITaskTypes {
  //   Rephrase = 'rephrase',
  //   Modify = 'modify',
  //   RewriteWithSeo = 'rewrite-with-seo',
  //   Append = 'append', // https://stackoverflow.com/questions/68146588/tiptap-insert-node-below-at-the-end-of-the-current-one
  // }

  const parser = new DOMParser();

  async function ai(type: AIConversationType, language: string = contentStore?.targetLanguage ?? ''): Promise<void> {
    try {
      setIsAILoading(true)
      // this ugly hack is needed because tiptap commands processing  inside tiptap engine behavior is different from execution
      const { html: selectedHtml, selection } = (editor.commands.getSelectedHtml() as unknown as GetSelectedHtmlReturn)
      // debugger
      const content = await conversationMutation.mutateAsync({
        type: type,
        content: selectedHtml,
        language,
      }) // TODO Timeout

      // debugger

      const wysiwygDocument: Document = parser.parseFromString(editor.getHTML(), 'text/html')
      const selectedDocument: Document = parser.parseFromString(content, 'text/html')
      // debugger

      selectedDocument.querySelectorAll('[id]').forEach(element => {
        if (element.querySelector('[id]')) return

        const id = element.getAttribute('id')
        if (id?.length) {
          wysiwygDocument.getElementById(id)?.replaceWith(element)
        }
      })

      editor.commands.setContent(wysiwygDocument.body.innerHTML) // TODO Purify
    } catch (e) {
      showError(e?.toString() ?? t('status.unknownError'))
    } finally {
      setIsAILoading(false)
    }
  }

  return (
    <>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <Menu withinPortal={false} opened={true} shadow="md" width={200} position="top" offset={0}>
          <Menu.Target>
            <span style={{ position: 'relative' }}></span>
          </Menu.Target>
          <Menu.Dropdown>
            <LoadingOverlay visible={isAILoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            <Menu.Label>{t('wysiwyg.aiLabels.rewrite')}</Menu.Label>
            <Menu.Item
              onClick={() =>
                ai('rephrase')
              }
            >
              {t('wysiwyg.aiTypes.rephrase')}
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                ai('rewrite-with-seo')
              }
            >
              {t('wysiwyg.aiTypes.rewriteWithSeo')}
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>{t('wysiwyg.aiLabels.modify')}</Menu.Label>
            <Menu.Item
              onClick={() =>
                ai('expand')
              }
            >
              {t('wysiwyg.aiTypes.expand')}
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                ai('summarize')
              }
            >
              {t('wysiwyg.aiTypes.summarize')}
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                ai('append')
              }
            >
              {t('wysiwyg.aiTypes.append')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </BubbleMenu>
    </>
  )
}
