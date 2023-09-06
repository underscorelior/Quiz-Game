'use client';

import React, { useState, useEffect } from 'react';
import CapitalsQuiz from '@/components/CapitalsQuiz.tsx';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Quiz() {
	const [capitalScore, setCapitalScore] = useState('0');

	useEffect(() => {
		if (!localStorage.getItem('capital-score')) {
			localStorage.setItem('capital-score', '0');
		}

		setCapitalScore(localStorage.getItem('capital-score') || '0');
	}, []);

	const updateScore = () => {
		setCapitalScore(localStorage.getItem('capital-score') || '');
	};

	return (
		<div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6 bg-black text-neutral-100">
			<Toaster />
			<CapitalsQuiz updateScore={updateScore} />
			<div className="flex w-full max-w-[70%] justify-between text-xl font-semibold md:max-w-[40%]">
				<h1 className="flex items-center justify-between">
					Capital Score: {capitalScore}
				</h1>
				<Link href="/flags/world/" className="quiz-button max-w-[65%]">
					World Flags Quiz
				</Link>
			</div>
		</div>
	);
}
