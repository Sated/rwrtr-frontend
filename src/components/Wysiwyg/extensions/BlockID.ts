import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { customAlphabet } from 'nanoid'
import { alphanumeric } from 'nanoid-dictionary'

const nanoid = customAlphabet(`${alphanumeric}`, 8)

const types: Record<string, boolean> = {
  blockquote: true,
  bulletList: true,
  codeBlock: true,
  document: true,
  hardBreak: true,
  heading: true,
  horizontalRule: true,
  image: true,
  listItem: true,
  mention: true,
  orderedList: true,
  paragraph: true,
  table: true,
  tableRow: true,
  tableCell: true,
  taskList: true,
  taskItem: true,
  youtube: true,
}

const BlockID = Extension.create({
  name: 'blockId',

  addGlobalAttributes() {
    return [
      {
        types: Object.keys(types),
        attributes: {
          blockId: {
            default: null,
            rendered: true,
            keepOnSplit: false,
            parseHTML: (attributes) => attributes.getAttribute(`data-id`),
            renderHTML: (attributes) => (attributes.blockId ? { id: attributes.blockId as string } : {}),
          },
        },
      },
    ]
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('blockId'),
        appendTransaction: (_transactions, oldState, newState) => {
          // no changes
          if (newState.doc === oldState.doc) {
            return
          }
          const tr = newState.tr

          newState.doc.descendants((node, pos, parent) => {
            if (
              node.isBlock &&
              // parent === newState.doc &&
              !node.attrs.blockId &&
              types[node.type.name]
            ) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                blockId: nanoid(),
              })
            }
          })

          return tr
        },
      }),
    ]
  },
})

export default BlockID
