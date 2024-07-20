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
		</div>
	);
}
