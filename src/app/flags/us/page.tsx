'use client';

import React, { useState, useEffect } from 'react';
import FlagsQuiz from '@/components/states/FlagsQuiz';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

export default function Quiz() {
	const [flagScore, setFlagScore] = useState('0');

	useEffect(() => {
		if (!localStorage.getItem('states-flag-score')) {
			localStorage.setItem('states-flag-score', '0');
		}
		setFlagScore(localStorage.getItem('states-flag-score') || '0');
	}, []);

	const updateScore = () => {
		setFlagScore(localStorage.getItem('states-flag-score') || '');
	};

	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6 bg-black text-neutral-100'>
			<Toaster />
			<FlagsQuiz updateScore={updateScore} />

			<div className='flex w-full max-w-[70%] justify-between text-xl font-semibold md:max-w-[40%]'>
				<h1 className='flex items-center justify-between'>
					Flag Score: {flagScore}
				</h1>
				<Link href='/capitals/us/' className='quiz-button max-w-[65%]'>
					State Capitals Quiz
				</Link>
			</div>
		</div>
	);
}
