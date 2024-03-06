import dynamic from 'next/dynamic'
import { Skeleton } from '@mantine/core'
import { type ForwardedRef, useEffect } from 'react'
import { type WysiwygProps } from '@/components/Wysiwyg/Wysiwyg'
import s from './Wysiwyg.module.scss'

interface WysiwygPropsExtended extends WysiwygProps {
  forwardedRef?: ForwardedRef<HTMLDivElement>
  onMounted?: () => void
}

export const WysiwygDynamic = dynamic(
  async () => {
    const { Wysiwyg } = await import('@/components/Wysiwyg/Wysiwyg')
    return ({ forwardedRef, onMounted, ...props }: WysiwygPropsExtended) => {
      useEffect(() => {
        onMounted?.()
      }, [])

      return <Wysiwyg ref={forwardedRef} {...props} />
    }
  },
  { ssr: false, loading: () => <Skeleton animate className={s.root} /> },
)
