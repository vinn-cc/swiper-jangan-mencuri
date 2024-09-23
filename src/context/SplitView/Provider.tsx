import { useState, type FunctionComponent } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SplitViewContext } from "./Context";
import { useSplitViews } from "./useSplitViews";

import "swiper/css";
import "swiper/css/navigation";

type Props = {
	Component: FunctionComponent<{ id: string } & object>;
};

export function SplitViewProvider({ Component }: Props) {
	const { isActiveConversation, onSetActiveConversation, ref, slidesPerView } =
		useSplitViews();

	const [stacks, setStacks] = useState<string[]>([]);

	return (
		<SplitViewContext.Provider value={{ ref }}>
			<main className="relative inset-0 h-full flex-1">
				<div className="absolute flex h-full w-full flex-col">
					<div className="relative flex-1 overflow-hidden">
						<Swiper
							className="!p-2 relative flex h-full gap-4 overflow-hidden"
							modules={[Navigation]}
							ref={ref}
							simulateTouch={false}
							slidesPerView={slidesPerView}
							spaceBetween={8}
						>
							{stacks.map((conversationId) => {
								return (
									<SwiperSlide key={conversationId}>
										<div
											className={
												"relative h-full max-h-full overflow-clip rounded-lg border border-gray-200"
											}
											onClick={() => onSetActiveConversation(conversationId)}
										>
											<Component id={conversationId} />
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
			</main>
		</SplitViewContext.Provider>
	);
}
