'use client';

import React, { useState, useEffect } from 'react';
import CapitalsQuiz from '@/components/CapitalsQuiz.tsx';
import FlagsQuiz from '@/components/FlagsQuiz.tsx';
import { Toaster } from 'react-hot-toast';


export default function Quiz() {
	const [quizType, setQuizType] = useState(true); // true = capitals, false = flags
	const [capitalScore, setCapitalScore] = useState('0');
	const [flagScore, setFlagScore] = useState('0');

	useEffect(() => {
		if (!localStorage.getItem('capital-score')) {
			localStorage.setItem('capital-score', '0');
		}
		if (!localStorage.getItem('flag-score')) {
			localStorage.setItem('flag-score', '0');
		}
		setCapitalScore(localStorage.getItem('capital-score') || '0');
		setFlagScore(localStorage.getItem('flag-score') || '0');
	}, []);

	const updateScore = () => {
		if (quizType) {
			setCapitalScore(localStorage.getItem('capital-score') || '');
		} else {
			setFlagScore(localStorage.getItem('flag-score') || '');
		}
	};

	return (
		<div className="my-8 flex w-full flex-col items-center justify-center gap-y-8 min-h-screen h-full">
			<Toaster />
			{quizType ? (
				<CapitalsQuiz updateScore={updateScore} />
			) : (
				<FlagsQuiz updateScore={updateScore} />
			)}
			<div className="grid w-full max-w-[70%] grid-rows-2 text-xl font-semibold md:max-w-[35%] md:grid-cols-2">
				<h1 className="flex items-center justify-between">
					{quizType ? 'Capital' : 'Flag'} Score:{' '}
					{quizType ? capitalScore : flagScore}
				</h1>
				<button onClick={() => setQuizType(!quizType)} className="quiz-button">
					Change Quiz Type
				</button>
			</div>
		</div>
	);
}
