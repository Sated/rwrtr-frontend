import type React from 'react'
import { useEffect, useRef } from 'react'

function syncScroll(
  target: HTMLElement,
  others: HTMLElement[],
  TopLeft: 'Top' | 'Left',
  WidthHeight: 'Height' | 'Width',
) {
  const percentage = target[`scroll${TopLeft}`] / (target[`scroll${WidthHeight}`] - target[`offset${WidthHeight}`])
  window.requestAnimationFrame(() => {
    others.forEach((el) => {
      el[`scroll${TopLeft}`] = Math.round(percentage * (el[`scroll${WidthHeight}`] - el[`offset${WidthHeight}`]))
    })
  })
}

function syncVerticalScroll(target: HTMLElement, others: HTMLElement[]) {
  syncScroll(target, others, 'Top', 'Height')
}

function syncHorizontalScroll(target: HTMLElement, others: HTMLElement[]) {
  syncScroll(target, others, 'Left', 'Width')
}

type UseSyncScrollOptions = {
  vertical: boolean
  horizontal: boolean
}

function useSyncScroll(
  refs: React.RefObject<HTMLElement>[] = [],
  { vertical, horizontal }: UseSyncScrollOptions,
) {
  const locksRef = useRef<number>(0)

  useEffect(() => {
    const refsRefOk = refs.length && refs.every((ref) => ref.current)

    if (!refsRefOk) return

    function handleScroll({ target }: Event) {
      if (locksRef.current > 0) {
        locksRef.current -= 1 // Release lock by 1
        return
      }

      if (!target) return

      locksRef.current = refs.length - 1 // Acquire lock

      const others = refs.reduce((result, ref) => {
        if (ref.current && ref.current !== target) result.push(ref.current)
        return result
      }, [] as HTMLElement[])
      if (vertical) syncVerticalScroll(target as HTMLElement, others)
      if (horizontal) syncHorizontalScroll(target as HTMLElement, others)
    }

    const elements = refs.reduce((result, ref) => {
      if (ref.current) result.push(ref.current)
      return result
    }, [] as HTMLElement[])
    elements.forEach((el) => el.addEventListener('scroll', handleScroll))
    return () => {
      elements.forEach((el) => el.removeEventListener('scroll', handleScroll))
    }
  }, [refs, vertical, horizontal, locksRef])
}

export default useSyncScroll
