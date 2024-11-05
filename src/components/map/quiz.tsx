'use client';
import { useEffect, useState, useRef } from 'react';
import { randomElement } from '@/utils/utils';
import { Skeleton } from '../skeleton';
import ClickMap from './click';
import USMapSVG from '@/assets/maps/us';

export default function MapQuiz({ options: optJSON }: { options: Option[] }) {
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

	function onMouseUp(short: string) {
		const result = {
			option,
			result: short == option?.short,
		} as resultOption;
		const ans = [result, ...answered];

		generateNewOption();
		setAnswered(ans);

		if (unused.length == 0) {
			setCompleted(true);
		}

		return ans;
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
					<ClickMap onMouseUp={onMouseUp} />
				) : (
					<Skeleton className='h-full min-h-[24rem] w-full' />
				)}
			</div>
		</section>
	);
}
