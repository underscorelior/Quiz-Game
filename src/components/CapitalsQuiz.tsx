import React, { Component } from 'react';
import QuizButton from './QuizButton';
import toast from 'react-hot-toast';
import countries from '@/assets/json/world.json';

interface props {
	updateScore: () => void;
}

interface state {
	question: string;
	options: string[];
	answer: string;
	selectedOption: string;
	isChecked: boolean;
}

class CapitalsQuiz extends Component<props, state> {
	constructor(props: props) {
		super(props);
		this.state = {
			question: '',
			options: [],
			answer: '',
			selectedOption: '',
			isChecked: false,
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
				'capital-score',
				String(
					parseInt(localStorage.getItem('capital-score') || '0') +
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
			country.capital = Array.isArray(country.capital)
				? country.capital.join(', ')
				: country.capital;

			let options = [country.capital];

			while (options.length < 4) {
				const randomIndex = Math.floor(Math.random() * countries.length);

				const optionCapital = countries[randomIndex].capital;
				const option = Array.isArray(optionCapital)
					? optionCapital.join(', ')
					: optionCapital;

				if (!options.includes(option)) {
					options.push(option);
				}
			}

			for (let i = options.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[options[i], options[j]] = [options[j], options[i]];
			}
			this.setState({
				question: `What is the capital of ${country.name}?`,
				options,
				answer: country.capital,
				isChecked: false,
				selectedOption: '',
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
		const { question, options, selectedOption, isChecked } = this.state;
		const isDisabled = selectedOption === '';
		return (
			<div className='flex w-full flex-col items-center justify-center'>
				<h1 className='mb-16 max-w-[80%] text-center text-5xl font-semibold'>
					{question}
				</h1>
				<section className='flex min-w-[80%] max-w-[80%] flex-col gap-y-3 md:min-w-[40%] md:max-w-[40%]'>
					{options.map((option, index) => (
						<QuizButton
							key={index}
							option={option}
							isSelected={selectedOption === option}
							isCorrect={(option === this.state.answer) === isChecked}
							isDisabled={isChecked}
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
			</div>
		);
	}
}

export default CapitalsQuiz;
