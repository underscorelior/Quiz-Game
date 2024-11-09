'use client';
import React, { useEffect, useState } from 'react';
import { randomElement } from '@/utils/utils';
import { Skeleton } from '../skeleton';

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

	function generateNewOption() {
		const opt: Option = randomElement(unused) as Option;

		setOption(opt);
		setUnused(unused.filter((item) => item.short !== opt.short));
		console.log(unused.length);
	}

	function onMouseUp(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
		const name = (e.target as SVGElement).getAttribute('class') || '';

		const state =
			(e.target as SVGElement).getAttribute('data-answer-state') || '';

		if (
			name.includes('sep') ||
			name.includes('-') ||
			name.length == 0 ||
			state.length != 0
		)
			return;

		const result = {
			option,
			result: name == option?.short,
		} as resultOption;
		const ans = [result, ...answered];

		generateNewOption();
		setAnswered(ans);

		if (unused.length == 0) {
			setCompleted(true);
		}

		ans.forEach((ans) => {
			findElementFromName(ans.option.short).setAttribute(
				'data-answer-state',
				ans.result ? 'correct' : 'wrong',
			);
		});
	}

	function findElementFromName(short: string) {
		if (short == 'dc') {
			const elms = document.getElementsByClassName(short);

			for (let i = 0; elms.length > i; i++) {
				if (elms[i].nodeName == 'circle') return elms[i];
			}
		}

		return document.getElementsByClassName(short)[0];
	}

	function countCorrect(): number {
		return answered.reduce((sum, opt) => (opt.result ? 1 : 0) + sum, 0);
	}

	useEffect(() => {
		setLoaded(false);
		setUnused(optJSON);
		generateNewOption();
		setLoaded(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='flex w-[90%] max-w-3xl flex-col items-center justify-center gap-8 rounded-md border-3 px-6 py-8 focus-within:outline-none lg:px-8'>
			<h1 className='flex flex-row'>
				{!completed ? (
					<>Click on {loaded ? option?.name : <Skeleton />}!</>
				) : (
					<>
						You got {countCorrect()}/{answered.length}
					</>
				)}
			</h1>
			<div className='flex h-full w-[95%] flex-col justify-center gap-x-8 gap-y-4 lg:w-full lg:gap-y-6'>
				{loaded ? (
					// <ClickMap onMouseUp={onMouseUp} />
					<MapElem
						onMouseUp={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
							onMouseUp(e);
						}}
					/>
				) : (
					<Skeleton className='h-full min-h-[24rem] w-full' />
				)}
			</div>
		</section>
	);
}
