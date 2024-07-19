import MultipleChoiceQuiz from '@/components/quiz/multiple-choice';

export default function TestPage() {
	return (
		<div className='p-10'>
			<MultipleChoiceQuiz
				question={
					<h1 className='text-2xl font-bold'>What is the capital of Canada?</h1>
				}
				options={['Quebec', 'United States', 'Mexico', 'Ottawa']}
				answer={3}
			/>
			<button className='duration-400 ease hover:animate-button-scale group relative h-10 min-w-[20%] cursor-pointer overflow-hidden rounded-md px-4 py-2 transition-all'>
				<div className='absolute left-0 top-0 h-full w-full rounded-md border-2 px-4 py-2'>
					cuba
				</div>
				<div className='pointer-events-none absolute inset-0'>
					<div className='before:group-hover:animate-button-width before:absolute before:left-0 before:top-0 before:h-[2px] before:w-0 before:rounded-tl-md before:rounded-tr-md before:bg-green-500'></div>
					<div className='before:group-hover:animate-button-height before:absolute before:right-0 before:top-0 before:h-0 before:w-[2px] before:rounded-br-md before:rounded-tr-md before:bg-green-500'></div>
					<div className='before:group-hover:animate-button-width2 before:absolute before:bottom-0 before:right-0 before:h-[2px] before:w-0 before:rounded-bl-md before:rounded-br-md before:bg-green-500'></div>
					<div className='before:group-hover:animate-button-height2 before:absolute before:bottom-0 before:left-0 before:h-0 before:w-[2px] before:rounded-bl-md before:rounded-tl-md before:bg-green-500'></div>
				</div>
			</button>
		</div>
	);
}
