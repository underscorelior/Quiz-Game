// TODO: Add detecting enter key for submitting, also flag obfuscation
// TODO: Add skeleton components to prevent shifting
// TODO: Make flags and capitals take up same height (maybe setting it here)
// TODO: Wrong answer somehow
'use client';
import { useEffect, useState } from 'react';
import QuizButton, { EtcQuizButton } from '../quiz-button';
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
		let countries: Option[] = optJSON;

		const options: Option[] = [];

		const answerOption: Option = randomElement(countries) as Option;

		options.push(answerOption);
		countries = countries.filter((item) => item.name !== answerOption.name);

		for (let i = 0; i < 3; i++) {
			const opt = randomElement(countries) as Option;
			options.push(opt);
			countries = countries.filter((item) => item.name !== opt.name);
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
		setSubmitted(false);
		setSelected('');
	}

	useEffect(() => {
		generateQuiz();
	}, []);

	return (
		<section className='flex w-[80%] max-w-xl flex-col items-center justify-center gap-8 rounded-md border-2 p-6'>
			<div>{quiz?.question}</div>
			<div className='flex w-full flex-col justify-center gap-x-8 gap-y-4 md:grid md:grid-cols-2 lg:gap-y-6'>
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
				<EtcQuizButton disabled={!selected} onClick={() => setSubmitted(true)}>
					Submit
				</EtcQuizButton>
			) : (
				<EtcQuizButton onClick={() => generateQuiz()}>
					Next Question
				</EtcQuizButton>
			)}
		</section>
	);
}
