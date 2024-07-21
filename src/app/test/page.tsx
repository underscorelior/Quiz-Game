import worldJSON from '@/assets/json/world.json';
import React from 'react';
import CapitalQuiz from '@/components/quiz/mcq-capital';

export default function TestPage() {
	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<CapitalQuiz options={worldJSON} />
			<div className='flex w-full max-w-[70%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
				{/* <h1 className='flex items-center justify-between'>
				Capital Score: {capitalScore}
				</h1> */}
			</div>
		</div>
	);
}
