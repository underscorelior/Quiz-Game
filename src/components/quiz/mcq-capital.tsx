'use client';
import { arrStrToStr } from '@/utils/utils';
import { Skeleton } from '../skeleton';
import MultipleChoiceQuiz from './multiple-choice';

export default function CapitalQuiz({ options }: { options: Option[] }) {
	function createQuestion(option: Option): React.ReactNode {
		return (
			<h1 className='flex h-[12rem] min-h-[12rem] items-center text-center text-3xl font-semibold'>{`What is the capital of ${option.name}?`}</h1>
		);
	}

	function formatOption(option: Option): string {
		return arrStrToStr(option.capital);
	}

	return (
		<MultipleChoiceQuiz
			options={options}
			questionSkeleton={
				<div className='flex h-[12rem] min-h-[12rem] w-full flex-col items-center justify-center gap-1'>
					<Skeleton className='h-8 w-[90%]' />
					<Skeleton className='h-8 w-[60%]' />
					<Skeleton className='h-8 w-[70%] lg:hidden' />
				</div>
			}
			createQuestion={createQuestion}
			formatOption={formatOption}
		/>
	);
}
