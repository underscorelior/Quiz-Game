import QuizButton from '../quiz-button';

export default function MultipleChoiceQuiz() {
	return (
		<section>
			<h1>Question</h1>
			<QuizButton
				option={'A'}
				submitted={false}
				selected={false}
				correct={false}
				onClick={function (option: string): void {
					console.log('A');
				}}
			/>
			<QuizButton
				option={'A'}
				submitted={false}
				selected={false}
				correct={false}
				onClick={function (option: string): void {
					console.log('A');
				}}
			/>
			<QuizButton
				option={'A'}
				submitted={false}
				selected={false}
				correct={false}
				onClick={function (option: string): void {
					console.log('A');
				}}
			/>
			<QuizButton
				option={'A'}
				submitted={false}
				selected={false}
				correct={false}
				onClick={function (option: string): void {
					console.log('A');
				}}
			/>
		</section>
	);
}
