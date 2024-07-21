'use client';
import { arrStrToStr } from '@/utils/utils';
import MultipleChoiceQuiz from './multiple-choice';

export default function CapitalQuiz({ options }: { options: Option[] }) {
	function createQuestion(option: Option): React.ReactNode {
		return (
			<h1 className='flex min-h-[9rem] items-center text-center text-3xl font-semibold lg:min-h-[6rem]'>{`What is the capital of ${option.name}?`}</h1>
		);
	}

	function formatOption(option: Option): string {
		return arrStrToStr(option.capital);
	}

	return (
		<MultipleChoiceQuiz
			options={options}
			createQuestion={createQuestion}
			formatOption={formatOption}
		/>
	);
}
