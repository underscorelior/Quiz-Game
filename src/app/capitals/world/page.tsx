import worldJSON from '@/assets/json/world.json';
import CapitalQuiz from '@/components/quiz/mcq-capital';
import Link from 'next/link';

export default function Quiz() {
	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<CapitalQuiz options={worldJSON} />
			<div className='flex w-full max-w-[70%] justify-between text-lg font-semibold text-zinc-900 md:max-w-[40%]'>
				<Link
					href='/flags/world/'
					className='w-[80%] rounded-md border-2 px-4 py-3'
				>
					World Flags Quiz
				</Link>
			</div>
		</div>
	);
}
