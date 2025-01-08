'use client';
import React, { useRef, useState } from 'react';
import { randomElement } from '@/utils/utils';
import { Skeleton } from '../skeleton';
import Timer from '../timer/timer';

export default function MapQuiz({
	options: optJSON,
	map: MapElem,
}: {
	options: Option[];
	map: React.ElementType<{
		onMouseUp: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
	}>;
}) {
	const [option, setOption] = useState<Option | null>(null);
	const [answered, setAnswered] = useState<resultOption[]>([]);
	const [unused, setUnused] = useState<Option[]>(optJSON);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [completed, setCompleted] = useState<boolean>(false);
	const [started, setStarted] = useState<boolean>(false);

	const timerRef = useRef<{
		start: () => void;
		stop: () => void;
		reset: () => void;
	}>(null);

	function generateNewOption() {
		const opt = randomElement(unused) as Option;

		setOption(opt);
		setUnused(unused.filter((item) => item.short !== opt.short));
	}

	function onMouseUp(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
		const target = e.target as SVGElement;
		const name = target.getAttribute('class') || '';
		const state = target.getAttribute('data-answer-state') || '';

		if (
			name.includes('sep') ||
			name.includes('-') ||
			name.length == 0 ||
			state.length != 0
		)
			return;

		const result = {
			option,
			result: name === option?.short,
		} as resultOption;

		const ans = [result, ...answered];

		markResult(result);

		generateNewOption();
		setAnswered(ans);

		if (unused.length == 0) {
			setCompleted(true);
			timerRef.current?.stop();
		}
	}

	function markResult(result: resultOption) {
		const element = findElementFromName(result.option.short);
		if (element)
			element.setAttribute(
				'data-answer-state',
				result.result ? 'correct' : 'wrong',
			);
	}

	function findElementFromName(short: string) {
		const elems = document.getElementsByClassName(short);
		if (short === 'dc') {
			return Array.from(elems).find((elem) => elem.nodeName === 'circle');
		}
		return elems[0];
	}

	function disableNotIncluded() {
		const elems = document.getElementsByTagName('path');
		console.log(elems, [...(elems as any)]);
		Array.from(elems).forEach((e) => {
			if (!unused.some((x) => e.classList.contains(x.short))) {
				e.style.opacity = '0.6';
				e.style.pointerEvents = 'none';
			}
		});
	}

	function countCorrect(): number {
		return answered.filter((opt) => opt.result).length;
	}

	return (
		<section className='relative flex w-[90%] max-w-3xl flex-col items-center justify-center gap-8 rounded-md border-4 px-6 py-8 focus-within:outline-none lg:px-8'>
			{!started && (
				<div className='absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-transparent backdrop-blur-sm'>
					<button
						className='rounded-md bg-black/30 px-4 py-2 text-xl text-stone-100 shadow-sm drop-shadow backdrop-blur-md'
						onClick={() => {
							setLoaded(false);
							disableNotIncluded();
							setLoaded(true);
							generateNewOption();
							setStarted(true);
							timerRef.current?.start();
						}}
					>
						Start Game
					</button>
				</div>
			)}
			<h1 className='flex flex-row items-center justify-center'>
				{!completed ? (
					<>Click on {loaded ? option?.name : <Skeleton />}!</>
				) : (
					<>
						You got {countCorrect()}/{answered.length}
					</>
				)}
			</h1>
			<div className='flex h-full max-h-[60vh] w-[95%] flex-col justify-center gap-x-8 gap-y-4 lg:w-full lg:gap-y-6'>
				<MapElem
					onMouseUp={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
						onMouseUp(e);
					}}
				/>
				{/* {loaded ? (
				) : (
					<Skeleton className='h-full min-h-[24rem] w-full' />
				)} */}
			</div>
			<div className='grid w-full grid-cols-3 items-center'>
				{!completed && (
					<div className='col-start-2 flex w-full justify-center'>
						{answered.length}/{optJSON.length}
					</div>
				)}
				<Timer
					ref={timerRef}
					hideBtn={!completed}
					className='col-start-2 flex w-full justify-center'
				/>
			</div>
		</section>
	);
}
