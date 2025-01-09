import usJSON from '@/assets/json/us_states.json';
import MapQuiz from '@/components/map/quiz';
import Link from 'next/link';
import USMapSVG from '@/assets/maps/us';

export default function Map() {
	return (
		<div className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6'>
			<MapQuiz
				options={usJSON as unknown as Option[]}
				map={USMapSVG}
				identifier='class'
			/>
			<div className='flex justify-between text-lg font-semibold text-zinc-900'>
				<Link href='/' className='rounded-md border-2 px-4 py-3 text-center'>
					Back to quizzes
				</Link>
			</div>
		</div>
	);
}
