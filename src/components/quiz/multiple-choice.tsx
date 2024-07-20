'use client';
import { useState } from 'react';
import QuizButton from '../quiz-button';

export default function MultipleChoiceQuiz({
	question,
	options,
	answer,
}: {
	question: React.ReactNode;
	options: string[];
	answer: string;
}) {
	const [selected, setSelected] = useState<string>('');
	const [submitted, setSubmitted] = useState<boolean>(false);

	return (
		<section className='flex w-max flex-col items-center justify-center gap-8 border-2 p-10'>
			{question}
			<div className='flex flex-wrap justify-center gap-4'>
				{options.map((option, idx) => {
					return (
						<QuizButton
							key={idx}
							option={option}
							submitted={submitted}
							selected={selected == option}
							correct={option == answer}
							onClick={setSelected}
						/>
					);
				})}
			</div>
			{!submitted ? (
				<button disabled={!selected} onClick={() => setSubmitted(true)}>
					Submit
				</button>
			) : (
				<button
					onClick={() => {
						setSubmitted(false);
						setSelected('');
					}}
				>
					Next Question
				</button>
			)}
		</section>
	);
}
