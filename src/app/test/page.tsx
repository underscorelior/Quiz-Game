'use client';

import MultipleChoiceQuiz from '@/components/quiz/multiple-choice';
import worldJSON from '@/assets/countries.json';
import React, { useEffect, useState } from 'react';
import { arrStrToStr, randomElement } from '@/utils/utils';

type Item = {
	flags: string;
	name: string;
	capital: string | string[];
};

type Quiz = {
	question: React.ReactNode;
	options: string[];
	answer: string; // TODO: Make answer an item for easier stuff later on
};

export default function TestPage() {
	const [quiz, setQuiz] = useState<Quiz | null>(null);

	function generateNextQuestion() {
		const countries: Item[] = worldJSON;

		const options: Item[] = [];

		const answerOption: Item = randomElement(countries) as Item;

		options.push(answerOption);
		countries.filter((item) => item !== answerOption);

		for (let i = 0; i < 3; i++) {
			const opt = randomElement(countries) as Item;
			options.push(opt);
			countries.filter((item) => item !== opt);
		}

		for (let i = options.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			[options[i], options[j]] = [options[j], options[i]];
		}

		const output: Quiz = {
			question: `What is the capital of ${answerOption.name}?`,
			options: options.map((option) => arrStrToStr(option.capital)),
			answer: arrStrToStr(answerOption.capital),
		};

		console.log(output);
		setQuiz(output);
	}

	useEffect(() => {
		generateNextQuestion();
	}, []);

	return (
		<div className='flex flex-col items-center justify-center gap-10 p-10'>
			<MultipleChoiceQuiz
				question={
					<h1 className='text-2xl font-bold'>{quiz?.question || ''}</h1>
				}
				options={quiz?.options || []}
				answer={quiz?.answer || ''}
			/>
			<button className='relative h-10 min-w-[20%] cursor-pointer overflow-hidden rounded-md px-4 py-2 transition-all hover:animate-button-scale'>
				<div className='absolute left-0 top-0 h-full w-full rounded-md border-2 px-4 py-2'>
					cuba
				</div>
				<div className='pointer-events-none absolute inset-0'>
					<div className='before:absolute before:left-0 before:top-0 before:h-[2px] before:w-0 before:rounded-tl-md before:rounded-tr-md before:bg-green-500 before:group-hover:animate-button-width'></div>
					<div className='before:absolute before:right-0 before:top-0 before:h-0 before:w-[2px] before:rounded-br-md before:rounded-tr-md before:bg-green-500 before:group-hover:animate-button-height'></div>
					<div className='before:absolute before:bottom-0 before:right-0 before:h-[2px] before:w-0 before:rounded-bl-md before:rounded-br-md before:bg-green-500 before:group-hover:animate-button-width2'></div>
					<div className='before:absolute before:bottom-0 before:left-0 before:h-0 before:w-[2px] before:rounded-bl-md before:rounded-tl-md before:bg-green-500 before:group-hover:animate-button-height2'></div>
				</div>
			</button>

			<button className='bg-250% inline-flex min-w-[20%] max-w-[40%] items-center justify-center whitespace-nowrap rounded-md bg-[linear-gradient(130deg,#22c55e_55%,#f5f5f4_45%)] p-0.5 hover:animate-answered'>
				<span className='h-10 w-full rounded-md bg-slate-50 px-4 py-2'>
					Cuba
				</span>
			</button>
		</div>
	);
}
