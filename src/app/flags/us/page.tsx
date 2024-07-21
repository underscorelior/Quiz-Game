'use client';

import React, { useState, useEffect } from 'react';
import usJSON from '@/assets/json/us_states.json';
import FlagQuiz from '@/components/quiz/mcq-flag';
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
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<FlagQuiz options={usJSON} />
			<div className='flex w-full max-w-[70%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
				{/* <h1 className='flex items-center justify-between'>
					Flag Score: {flagScore}
				</h1> */}
				<Link
					href='/capitals/us/'
					className='w-[80%] rounded-md border-2 px-4 py-3'
				>
					State Capitals Quiz
				</Link>
			</div>
		</div>
	);
}
