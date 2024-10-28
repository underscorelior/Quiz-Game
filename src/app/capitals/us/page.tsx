import usJSON from '@/assets/json/us_states.json';
import CapitalQuiz from '@/components/quiz/mcq-capital';
import Link from 'next/link';

export default function Quiz() {
	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<CapitalQuiz options={usJSON} />
			<div className='flex w-[90%] max-w-xl justify-between text-lg font-semibold text-zinc-900'>
				<Link href='/' className='rounded-md border-2 px-4 py-3 text-center'>
					Back to quizzes
				</Link>
			</div>
		</div>
	);
}
