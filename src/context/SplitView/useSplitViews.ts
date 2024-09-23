import {
  GetActiveConversationSelector,
  SetActiveConversation,
  SplitViewSelector,
} from '@console/interactions/Chat'
import type {ConversationId} from '@console/interactions/Chat/State/Common'
import {useCallback, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import type {SwiperRef} from 'swiper/react'

export function useSplitViews() {
  const dispatch = useDispatch()

  const ref = useRef<SwiperRef>(null)

  const dataActiveConversation = useSelector(GetActiveConversationSelector)
  const dataSplitView = useSelector(SplitViewSelector)

  const isActiveConversation = useCallback(
    (id: ConversationId) => id === dataActiveConversation?.conversationId,
    [dataActiveConversation],
  )

  const onSetActiveConversation = useCallback(
    (id: ConversationId) => {
      dispatch(
        SetActiveConversation({
          conversationId: id,
          isSlideToFocused: false,
        }),
      )
    },
    [dispatch],
  )

  useEffect(() => {
    if (!dataActiveConversation) {
      return
    }

    const idx = dataSplitView.stacks.indexOf(dataActiveConversation.conversationId)

    if (idx === -1 && dataActiveConversation.isSlideToFocused) {
      ref.current?.swiper.slideTo(dataSplitView.stacks.length - 1)
    } else if (dataActiveConversation.isSlideToFocused) {
      ref.current?.swiper.slideTo(idx)
    }
  }, [dataActiveConversation, dataSplitView.stacks])

  return {
    isActiveConversation,
    onSetActiveConversation,
    ref,
    slidesPerView:
      dataSplitView.limit > dataSplitView.stacks.length
        ? dataSplitView.stacks.length
        : dataSplitView.limit,
  }
}
