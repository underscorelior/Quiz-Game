import worldJSON from '@/assets/json/world.json';
import React from 'react';
import CapitalQuiz from '@/components/quiz/mcq-capital';

export default function TestPage() {
	return (
		<div className='flex flex-col items-center justify-center gap-10 p-10'>
			<CapitalQuiz options={worldJSON} />
		</div>
	);
}
