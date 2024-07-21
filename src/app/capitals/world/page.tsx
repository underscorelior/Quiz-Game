'use client';

import React, { useState, useEffect } from 'react';
import worldJSON from '@/assets/json/world.json';
import CapitalQuiz from '@/components/quiz/mcq-capital';
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
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<CapitalQuiz options={worldJSON} />
			<div className='flex w-full max-w-[70%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
				{/* <h1 className='flex items-center justify-between'>
					Capital Score: {capitalScore}
				</h1> */}
				<Link
					href='/flags/world/'
					className='max-w-[65%] rounded-md border-2 px-4 py-3'
				>
					World Flags Quiz
				</Link>
			</div>
		</div>
	);
}
