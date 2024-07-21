'use client';
import { arrStrToStr } from '@/utils/utils';
import { Skeleton } from '../skeleton';
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
			questionSkeleton={<Skeleton className='h-4 w-[250px]' />}
			createQuestion={createQuestion}
			formatOption={formatOption}
		/>
	);
}
