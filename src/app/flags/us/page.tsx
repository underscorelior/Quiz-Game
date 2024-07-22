import usJSON from '@/assets/json/us_states.json';
import FlagQuiz from '@/components/quiz/mcq-flag';
import Link from 'next/link';

export default function Quiz() {
	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<FlagQuiz options={usJSON} />
			<div className='flex w-full max-w-[70%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
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
