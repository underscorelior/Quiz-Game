import usJSON from '@/assets/json/us_states.json';
import CapitalQuiz from '@/components/quiz/mcq-capital';
import Link from 'next/link';

export default function Quiz() {
	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<CapitalQuiz options={usJSON} />
			<div className='flex w-full max-w-[70%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
				<Link
					href='/flags/us/'
					className='w-[80%] rounded-md border-2 px-4 py-3'
				>
					State Flags Quiz
				</Link>
			</div>
		</div>
	);
}
