import React, { Component } from 'react';
import QuizButton from './QuizButton';
import toast from 'react-hot-toast';

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
		localStorage.setItem(
			'capital-score',
			String(
				parseInt(localStorage.getItem('capital-score') || '0') +
					(isCorrect ? 1 : 0),
			),
		);
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
			const response = await fetch(
				'https://underscore.wtf/countries/countries.json',
			);
			const countries = await response.json();
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
	}

	render() {
		const { question, options, selectedOption, isChecked } = this.state;
		const isDisabled = selectedOption === '';
		return (
			<div className="flex w-full min-w-[80%] max-w-[80%] flex-col items-center justify-center gap-y-4  md:min-w-[40%] md:max-w-[40%]">
				<h1 className="mb-3 text-center text-2xl font-semibold">{question}</h1>
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
						disabled={isChecked || isDisabled}>
						Check Answer
					</button>
				) : (
					<button
						className="quiz-button-next"
						onClick={this.generateNextQuestion}>
						Next Question
					</button>
				)}
			</div>
		);
	}
}

export default CapitalsQuiz;
