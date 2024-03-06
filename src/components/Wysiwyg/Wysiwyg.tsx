import { forwardRef, useEffect } from 'react'
import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

import s from './Wysiwyg.module.scss'
import GetSelectedText from './extensions/GetSelectedText'
import GetSelectedHtml from './extensions/GetSelectedHtml'
import BlockID from './extensions/BlockID'
import { WysiwygExternalContent, type WysiwygExternalContentProps } from '@/components/Wysiwyg/WysiwygExternalContent'
import { WysiwygExportMenu } from '@/components/Wysiwyg/WysiwygExportMenu'
import { WysiwygAIBubbleMenu } from '@/components/Wysiwyg/WysiwygAIBubbleMenu'

// import UniqueID from '@tiptap-pro/extension-unique-id'
// UniqueID.configure({
//   types: ['heading', 'paragraph'],
// }),


export interface WysiwygProps {
  externalContents?: WysiwygExternalContentProps[]
  title?: string
  initialData: string
  readonly?: boolean
}

export const Wysiwyg = forwardRef<HTMLDivElement, WysiwygProps>(function Wysiwyg(props: WysiwygProps, ref) {
  // const externalContent = props.externalContents?.reduce((externalContents, { title, content }) => {
  //   const hasData = Boolean(title) && Boolean(content)
  //   return externalContents + hasData ? `<external-content-component title="${title}" content="${content}"></external-content-component>` : ''
  // }, '') ?? ''

  const editor = useEditor({
    editable: !props.readonly,
    extensions: [
      GetSelectedText,
      GetSelectedHtml,
      StarterKit,
      Underline,
      Link,
      BlockID,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: props.initialData,
  })

  useEffect(() => {
    editor?.commands.setContent(props.initialData)
  }, [props.initialData])

  return (
    <div className={s.wrapper}>
      <RichTextEditor className={s.root} editor={editor} ref={ref}>
        <RichTextEditor.Toolbar className={props.readonly ? s.readonly : ''} sticky stickyOffset={0}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.ClearFormatting />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        {props.externalContents?.map(({ title, content }) => (
          <WysiwygExternalContent key={title} title={title} content={content} />
        ))}

        <RichTextEditor.Content />
      </RichTextEditor>

      {editor && <WysiwygAIBubbleMenu editor={editor} />}

      {editor && <WysiwygExportMenu btnClassName={s.exportBtn} editor={editor} />}
    </div>
  )
})