import { useRef, useMemo, useState } from 'react'
import { Grid } from '@mantine/core'
import useSyncScroll from '@/hooks/use-sync-scroll'
import {
  WysiwygDynamic,
} from '@/components/Wysiwyg/WysiwygDynamic'
import type { ContentWithTranslation } from '@/entities/Content/types'

import s from './Content.module.scss'

export function Content(props: ContentWithTranslation) {
  const originalWysiwygRef = useRef<HTMLDivElement>(null)
  const resultWysiwygRef = useRef<HTMLDivElement>(null)
  const [syncScrollKey, setSyncScrollKey] = useState(0)
  const wysiwygRefs = useMemo(
    () => [originalWysiwygRef, resultWysiwygRef],
    [originalWysiwygRef.current, resultWysiwygRef.current, syncScrollKey],
  )

  useSyncScroll(wysiwygRefs, { vertical: true, horizontal: false })

  return (
    <Grid gutter="sm" className={s.root}>
      <Grid.Col span={6}>
        <WysiwygDynamic
          onMounted={() => setSyncScrollKey((prev) => prev + 1)}
          forwardedRef={originalWysiwygRef}
          initialData={props.content}
          externalContents={[
            { title: 'Title', content: props.title },
            { title: 'Description', content: props.description },
          ]}
          readonly
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <WysiwygDynamic
          onMounted={() => setSyncScrollKey((prev) => prev + 1)}
          forwardedRef={resultWysiwygRef}
          initialData={props.translatedContent}
          externalContents={[
            { title: 'Title', content: props.translatedTitle },
            { title: 'Description', content: props.translatedDescription },
          ]}
        />
      </Grid.Col>
    </Grid>
  )
}
