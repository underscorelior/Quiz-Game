'use client';

import React, { useState, useEffect } from 'react';
import worldJSON from '@/assets/json/world.json';
import FlagQuiz from '@/components/quiz/mcq-flag';
import Link from 'next/link';

export default function Quiz() {
	const [flagScore, setFlagScore] = useState('0');

	useEffect(() => {
		if (!localStorage.getItem('flag-score')) {
			localStorage.setItem('flag-score', '0');
		}
		setFlagScore(localStorage.getItem('flag-score') || '0');
	}, []);

	const updateScore = () => {
		setFlagScore(localStorage.getItem('flag-score') || '');
	};

	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<FlagQuiz options={worldJSON} />
			<div className='flex w-full max-w-[70%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
				{/* <h1 className='flex items-center justify-between'>
					Flag Score: {flagScore}
				</h1> */}
				<Link
					href='/capitals/world/'
					className='w-[80%] rounded-md border-2 px-4 py-3'
				>
					World Capitals Quiz
				</Link>
			</div>
		</div>
	);
}
