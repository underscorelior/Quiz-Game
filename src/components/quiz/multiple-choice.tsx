'use client';
import { useEffect, useState } from 'react';
import QuizButton from '../quiz-button';
import { randomElement } from '@/utils/utils';

export default function MultipleChoiceQuiz({
	options: optJSON,
	createQuestion,
	formatOption,
}: {
	options: Option[];
	createQuestion: (option: Option) => React.ReactNode;
	formatOption: (option: Option) => string;
}) {
	const [selected, setSelected] = useState<string>('');
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [quiz, setQuiz] = useState<Quiz | null>(null);

	function generateRandomOptions(): { options: Option[]; answer: Option } {
		const countries: Option[] = optJSON;

		const options: Option[] = [];

		const answerOption: Option = randomElement(countries) as Option;

		options.push(answerOption);
		countries.filter((item) => item !== answerOption);

		for (let i = 0; i < 3; i++) {
			const opt = randomElement(countries) as Option;
			options.push(opt);
			countries.filter((item) => item !== opt);
		}

		for (let i = options.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			[options[i], options[j]] = [options[j], options[i]];
		}

		return { options, answer: answerOption };
	}

	function generateQuiz() {
		const { options, answer } = generateRandomOptions();

		const output: Quiz = {
			question: createQuestion(answer),
			options: options.map((option) => formatOption(option)),
			answer: { full: answer, format: formatOption(answer) },
		};

		setQuiz(output);
	}

	useEffect(() => {
		generateQuiz();
	}, []);

	return (
		<section className='flex w-[40%] flex-col items-center justify-center gap-8 border-2 p-10'>
			{quiz?.question}
			<div className='grid w-full grid-cols-2 justify-center gap-4'>
				{quiz?.options.map((option, idx) => {
					return (
						<QuizButton
							key={idx}
							option={option}
							submitted={submitted}
							selected={selected == option}
							correct={option == quiz.answer.format}
							onClick={setSelected}
							className={'w-full'}
						/>
					);
				})}
			</div>
			{!submitted ? (
				<button
					disabled={!selected}
					onClick={() => setSubmitted(true)}
					className='rounded-md border-2 border-zinc-500 px-4 py-2 font-medium text-zinc-700 enabled:hover:border-zinc-700 enabled:hover:bg-zinc-100 disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-50 disabled:text-zinc-500'
				>
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
