import {createContext, useContext, type RefObject} from 'react'
import type {SwiperRef} from 'swiper/react'

export interface SplitViewContext {
  ref: RefObject<SwiperRef> | null
}

export const SplitViewContext = createContext<SplitViewContext>({
  ref: null,
})

export function useSplitViewContext() {
  const ctx = useContext<SplitViewContext>(SplitViewContext)

  if (!ctx) {
    throw Error('useSplitViewContext should be used within SplitViewProvider')
  }

  return ctx
}
