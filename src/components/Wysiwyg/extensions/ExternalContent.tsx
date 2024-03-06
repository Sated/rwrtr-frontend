import { mergeAttributes, Node, type NodeViewRendererProps } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { ActionIcon, Fieldset, Flex, rem, Tooltip } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { IconCopy, IconCopyCheck } from '@tabler/icons-react'

export interface ExternalContentObject {
  title: string
  content: string
}

function ExternalContent(props: NodeViewRendererProps) {
  const title = (props.node.attrs.title as string) || ''
  const content = (props.node.attrs.content as string) || ''

  const clipboard = useClipboard({ timeout: 1000 })

  return (
    <NodeViewWrapper className="external-content">
      <Fieldset legend={title} mb={rem(16)}>
        <Flex style={{ justifyContent: 'space-between' }}>
          <div className="content">{content}</div>
          <Tooltip label={clipboard.copied ? 'Copied' : 'Copy to clipboard'}>
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
    </NodeViewWrapper>
  )
}

export default Node.create({
  name: 'externalContent',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      title: {
        default: '',
      },
      content: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'external-content-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['external-content-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ExternalContent)
  },
})
