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
		</div>
	);
}
