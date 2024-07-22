// TODO: Obfuscate images to prevent cheating
// TODO: Make a better randomization (remove last 10 from array of available questions)

'use client';
import { useEffect, useState, useRef } from 'react';
import QuizButton, { EtcQuizButton } from '../quiz-button';
import { randomElement } from '@/utils/utils';
import { Skeleton } from '../skeleton';

export default function MultipleChoiceQuiz({
	options: optJSON,
	questionSkeleton,
	createQuestion,
	formatOption,
}: {
	options: Option[];
	questionSkeleton: React.ReactNode;
	createQuestion: (option: Option) => React.ReactNode;
	formatOption: (option: Option) => string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [selected, setSelected] = useState<string>('');
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [quiz, setQuiz] = useState<Quiz | null>(null);
	const [loaded, setLoaded] = useState<boolean>(false);

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
		setLoaded(false);
		const { options, answer } = generateRandomOptions();

		const output: Quiz = {
			question: createQuestion(answer),
			options: options.map((option) => formatOption(option)),
			answer: { full: answer, format: formatOption(answer) },
		};

		setQuiz(output);
		setSubmitted(false);
		setSelected('');
		setLoaded(true);
	}

	useEffect(() => {
		generateQuiz();
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, [submitted]);

	function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
		if (event.key === 'Enter') {
			if (!submitted && selected) {
				setSubmitted(true);
			} else if (submitted) {
				generateQuiz();
			}
		}
	}

	return (
		<section
			ref={ref}
			className='border-3 flex w-[90%] max-w-xl flex-col items-center justify-center gap-8 rounded-md px-6 py-8 focus-within:outline-none'
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			{loaded ? <div>{quiz?.question}</div> : questionSkeleton}
			<div className='flex w-[95%] flex-col justify-center gap-x-8 gap-y-4 md:grid md:grid-cols-2 lg:w-full lg:gap-y-6'>
				{loaded
					? quiz?.options.map((option, idx) => {
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
						})
					: [0, 1, 2, 3].map((idx) => {
							// const x = `w-[${Math.floor(Math.random() * idx * 10)}px]`; // TODO: Make these random widths to make it more interesting
							return (
								<div
									className='h-13 flex w-full items-center justify-center rounded-md border-[3px] p-4'
									key={idx}
								>
									<Skeleton className={'h-4 w-[60%]'} />
								</div>
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
