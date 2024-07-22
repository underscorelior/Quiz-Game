import worldJSON from '@/assets/json/world.json';
import FlagQuiz from '@/components/quiz/mcq-flag';
import Link from 'next/link';

export default function Quiz() {
	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<FlagQuiz options={worldJSON} />
			<div className='flex w-[90%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
				<Link
					href='/capitals/world/'
					className='ml-auto w-[60%] rounded-md border-2 px-4 py-3 text-center'
				>
					World Capitals Quiz
				</Link>
			</div>
		</div>
	);
}
