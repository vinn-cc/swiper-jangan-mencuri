import { useEffect, useRef, useState } from "react";
import { Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";
import "./index.css";

function App() {
	const [stacks, setStacks] = useState<string[]>([]);
	const visibleConversationIds = useRef<string[]>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const ref = useRef<SwiperRef>(null);

	useEffect(() => {
		ref.current?.swiper.update();

		visibleConversationIds.current =
			ref.current?.swiper.slides
				.filter((slide) =>
					slide.classList.contains("swiper-slide-fully-visible"),
				)
				.map((slide) => slide.dataset.conversationid)
				.filter((id): id is string => id !== null) || [];

		console.log("ai", activeIndex, visibleConversationIds.current);

		if (activeIndex === null) {
			ref.current?.swiper.slideTo(stacks.length);
			return;
		}

		if (visibleConversationIds.current.includes(stacks[activeIndex])) {
			return;
		}

		ref.current?.swiper.slideTo(activeIndex);
	}, [stacks, activeIndex]);

	return (
		<div className="mx-auto flex h-screen w-full flex-col">
			<div className="flex h-full w-full flex-row">
				<div className="w-64 bg-pink-300">
					{stacks.map((stack, index) => (
						<button
							type="button"
							key={stack}
							className="w-full h-16 bg-pink-400"
							onClick={() => setActiveIndex(index)}
						>
							<p>{stack}</p>
						</button>
					))}

					<button
						className="h-16 w-full border-2 bg-pink-300"
						type="button"
						onClick={() => {
							setStacks((prev) => {
								return [...prev, `Slide ${prev.length + 1}`];
							});
						}}
					>
						Add
					</button>
				</div>

				<main className="relative inset-0 h-full flex-1">
					<div className="absolute flex h-full w-full">
						<div className="relative overflow-hidden flex-1">
							<Swiper
								className="!p-3 relative flex w-full h-full gap-4 overflow-hidden"
								modules={[Navigation]}
								ref={ref}
								simulateTouch={false}
								slidesPerView={3}
								spaceBetween={8}
								watchSlidesProgress
							>
								{stacks.map((conversationId, index) => {
									return (
										<SwiperSlide
											data-conversationid={conversationId}
											virtualIndex={index}
											key={conversationId}
										>
											<div
												className={
													"relative h-full max-h-full overflow-clip rounded-lg border border-gray-200"
												}
											>
												<div className="bg-teal-300 h-full w-full flex items-center justify-center">
													<h1 className="text-3xl">{conversationId}</h1>
												</div>
											</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
