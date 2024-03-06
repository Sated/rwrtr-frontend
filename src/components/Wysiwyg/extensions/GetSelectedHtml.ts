import { Extension } from '@tiptap/core'
import { type Editor} from '@tiptap/react'
import { DOMSerializer } from 'prosemirror-model'
import { showError } from '@/utils/notifications'
import type { Selection } from '@tiptap/pm/state'

export interface GetSelectedHtmlReturn {
  html: string
  selection: Selection
}

declare module '@tiptap/core' {
  interface Commands {
    getSelectedHtml: {
      getSelectedHtml: () => ({ editor }: { editor: Editor }) => GetSelectedHtmlReturn
    }
  }
}

const removeAllEmptyTags = (html: string): string => {
  return html.replace(/<([A-z]+)([^>^/]*)>\s*<\/\1>/gim, (match, p1) => {
    if (p1 === 'tr' || p1 === 'td') {
      return match
    } else {
      return ''
    }
  })
}

const GetSelectedHtml = Extension.create({
  name: 'GetSelectedHtml',
  addCommands() {
    return {
      getSelectedHtml:
        () =>
        ({ editor }: { editor: Editor }): GetSelectedHtmlReturn => {
          const { selection } = editor.state
          for (const range of selection.ranges) {
            const { $from, $to } = range
            const fromNodeSize = $from.parent.isText ? $from.parent.nodeSize : $from.parent.nodeSize - 2
            const toNodeSize = $to.parent.isText ? $to.parent.nodeSize : $to.parent.nodeSize - 2
            const isSelectedFull =
              ($from.parentOffset === 0 || $from.parentOffset === fromNodeSize) &&
              // $from.parentOffset === fromNodeSize &&
              ($to.parentOffset === 0 || ($to.parentOffset > 0 && $to.parentOffset === toNodeSize))

            // debugger
            if (!isSelectedFull) {
              showError('Выберите полный фрагмент текста, я не умею работать с его частью')
            }
          }
          if (selection.empty) return { html: '', selection }
          const slice = selection.content()
          const serializer = DOMSerializer.fromSchema(editor.schema)
          const fragment = serializer.serializeFragment(slice.content)
          const div = document.createElement('div')
          fragment.querySelectorAll('[id]').forEach(element => {
            if (element.querySelector('[id]')) {

            }
          })

          div.appendChild(fragment)

          return {
            html: removeAllEmptyTags(div.innerHTML),
            selection
          }
        },
    }
  },
})

export default GetSelectedHtml
