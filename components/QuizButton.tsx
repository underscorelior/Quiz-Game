import React, { Component } from 'react';

interface props {
	option: string;
	isSelected: boolean;
	isDisabled: boolean;
	isCorrect: boolean;
	onClick: (option: string) => void;
}

class QuizButton extends Component<props> {
	render() {
		const { option, isSelected, isDisabled, isCorrect, onClick } = this.props;
		let className = 'quiz-button';

		if (isDisabled) {
			className += isSelected
				? isCorrect
					? ' quiz-button-correct'
					: ' quiz-button-wrong'
				: ' quiz-button-generic';
		} else if (isSelected) {
			className += ' quiz-button-selected';
		}

		return (
			<button
				className={className}
				onClick={() => onClick(option)}
				disabled={isDisabled}>
				{option}
			</button>
		);
	}
}

export default QuizButton;
