import React from 'react';

const TimeLine = () => {
	return (
		<section className="relative mx-auto max-w-7xl  sm:px-6  overflow-hidden">
			<article className="md:flex">
				<div className="container mx-auto w-full h-full">
					<div className="relative wrap overflow-hidden h-full">
						<div
							className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
							style={{ left: '50%' }}
						></div>

						<div className="mb-8 flex justify-between items-center w-full right-timeline">
							<div className="order-1 w-5/12"></div>
							<div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
								<h1 className="mx-auto font-semibold text-lg text-white">1</h1>
							</div>
							<div className="order-1 bg-gray-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
								<h3 className="mb-3 font-bold text-gray-700 text-2xl">
									問題集を選択
								</h3>

								<img loading="lazy" src="/works.png" alt="Logspot" />
							</div>
						</div>

						<div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
							<div className="order-1 w-5/12"></div>
							<div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
								<h1 className="mx-auto text-white font-semibold text-lg">2</h1>
							</div>
							<div className="order-1 bg-gray-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
								<h3 className="mb-3 font-bold text-gray-700 text-2xl">
									チャレンジしたい問題を選択
								</h3>

								<img loading="lazy" src="/chapters.png" alt="Logspot" />
							</div>
						</div>

						<div className="mb-8 flex justify-between items-center w-full right-timeline">
							<div className="order-1 w-5/12"></div>
							<div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
								<h1 className="mx-auto font-semibold text-lg text-white">3</h1>
							</div>
							<div className="order-1 bg-gray-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
								<h3 className="mb-3 font-bold text-gray-700 text-2xl">
									エディタにコードを書く
								</h3>

								<img loading="lazy" src="/practices.png" alt="Logspot" />
							</div>
						</div>
						<div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
							<div className="order-1 w-5/12"></div>
							<div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
								<h1 className="mx-auto text-white font-semibold text-lg">4</h1>
							</div>
							<div className="order-1 bg-gray-200 rounded-lg shadow-xl w-5/12 px-6 py-4">
								<h3 className="mb-3 font-bold text-gray-700 text-2xl">
									書いたコードを判定
								</h3>

								<img loading="lazy" src="/comparison.png" />
							</div>
						</div>
					</div>
				</div>
			</article>
		</section>
	);
};

export default TimeLine;
