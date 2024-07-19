import React, { Component } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import countries from '@/assets/countries.json';
import QuizButton from './quiz-button';

interface props {
	updateScore: () => void;
}

interface state {
	options: string[];
	answer: string;
	selectedOption: string;
	isChecked: boolean;
	flagUrl: string;
}

interface ConversionDict {
	[key: string]: string;
}

class FlagsQuiz extends Component<props, state> {
	constructor(props: props) {
		super(props);
		this.state = {
			options: [],
			answer: '',
			selectedOption: '',
			isChecked: false,
			flagUrl: '',
		};
	}

	handleOptionSelect = (option: string) => {
		this.setState({ selectedOption: option });
	};

	handleAnswerCheck = () => {
		const { selectedOption, answer } = this.state;
		const isCorrect = selectedOption === answer;
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'flag-score',
				String(
					parseInt(localStorage.getItem('flag-score') || '0') +
						(isCorrect ? 1 : 0),
				),
			);
		}
		this.props.updateScore();
		this.setState({ isChecked: true });
		toast(isCorrect ? 'Correct!' : `Incorrect! Correct Answer: ${answer}.`, {
			icon: isCorrect ? '✅' : '⛔',
			style: {
				borderRadius: '10px',
			},
		});
	};

	generateNextQuestion = async () => {
		try {
			const randomIndex = Math.floor(Math.random() * countries.length);
			const country = countries[randomIndex];

			let options = [country.name];

			while (options.length < 4) {
				const randomIndex = Math.floor(Math.random() * countries.length);

				const optionName = countries[randomIndex].name;
				const option = Array.isArray(optionName)
					? optionName.join(', ')
					: optionName;

				if (!options.includes(option)) {
					options.push(option);
				}
			}

			for (let i = options.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[options[i], options[j]] = [options[j], options[i]];
			}

			this.setState({
				options,
				answer: country.name,
				isChecked: false,
				selectedOption: '',
				flagUrl: `${country.flags
					.replace('w320/', '')
					.replace('.png', '.svg')}`,
			});
		} catch (error) {
			console.error(error);
			toast.error(
				'Could not load countries. Please check your internet connection.',
			);
		}
	};

	componentDidMount() {
		this.generateNextQuestion();
		window.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress = (event: KeyboardEvent) => {
		const { options } = this.state;
		const key = event.key;

		if (key === 'Enter' && this.state.selectedOption !== '') {
			if (!this.state.isChecked) {
				this.handleAnswerCheck();
			} else {
				this.generateNextQuestion();
			}
		}

		if (
			!isNaN(parseInt(key)) &&
			options[parseInt(key) - 1] &&
			!this.state.isChecked
		) {
			this.setState({ selectedOption: options[parseInt(key) - 1] });
		}
	};

	render() {
		const { flagUrl, options, selectedOption, isChecked } = this.state;
		const isDisabled = selectedOption === '';

		return (
			<section className='flex w-full flex-col items-center justify-center gap-y-4'>
				<Image
					src={flagUrl}
					className='m-2 h-[256px] w-auto select-none rounded-lg border-2 border-neutral-50'
					alt='Flag of country'
					width={256}
					draggable={false}
					height={256}
				/>
				<section className='flex min-w-[80%] max-w-[80%] flex-col gap-y-3 md:min-w-[40%] md:max-w-[40%]'>
					{options.map((option, index) => (
						<QuizButton
							key={index}
							option={option}
							selected={selectedOption === option}
							submitted={isChecked}
							correct={(option === this.state.answer) === isChecked}
							onClick={this.handleOptionSelect}
						/>
					))}
					{!isChecked ? (
						<button
							className={'quiz-button-check'}
							onClick={this.handleAnswerCheck}
							disabled={isChecked || isDisabled}
						>
							Check Answer
						</button>
					) : (
						<button
							className='quiz-button-next'
							onClick={this.generateNextQuestion}
						>
							Next Question
						</button>
					)}
				</section>
			</section>
		);
	}
}

export default FlagsQuiz;
