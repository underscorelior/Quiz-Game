'use client';
import Image from 'next/image';
import QuizButton from '../quiz-button';

export default function MultipleChoiceQuiz({
	question,
	options,
	answer,
}: {
	question: React.ReactNode;
	options: string[];
	answer: number;
}) {
	return (
		<section className='flex w-max flex-col items-center justify-center gap-8 border-2 p-10'>
			<h1>{question}</h1>
			<div className='flex flex-wrap justify-center gap-4'>
				{options.map((option, idx) => {
					return (
						<QuizButton
							key={idx}
							option={option}
							submitted={false}
							selected={false}
							correct={idx == answer}
							onClick={function (option: string): void {
								console.log(option);
							}}
						/>
					);
				})}
			</div>
			<button>Submit</button>
		</section>
	);
}
