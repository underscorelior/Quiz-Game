import React, { Component } from 'react';

class QuizButton extends Component {
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
