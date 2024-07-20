import worldJSON from '@/assets/json/world.json';
import React from 'react';
import FlagQuiz from '@/components/quiz/mcq-flag';

export default function TestPage() {
	return (
		<div className='flex flex-col items-center justify-center gap-10 p-10'>
			<FlagQuiz options={worldJSON} />
		</div>
	);
}
