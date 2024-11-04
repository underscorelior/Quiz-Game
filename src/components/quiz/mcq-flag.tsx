'use client';
import FlagImage from '../flag-image';
import { Skeleton } from '../skeleton';
import MultipleChoiceQuiz from './multiple-choice';

export default function FlagQuiz({ options }: { options: Option[] }) {
	function createQuestion(option: Option): React.ReactNode {
		return (
			<FlagImage // TODO: FIX FOR DC
				url={option.flag.replace('w320/', '').replace('.png', '.svg')}
			/>
		);
	}

	function formatOption(option: Option): string {
		return option.name;
	}

	return (
		<MultipleChoiceQuiz
			options={options}
			questionSkeleton={
				<Skeleton className='aspect-video h-[12rem] w-auto border-2 border-zinc-800' />
			}
			createQuestion={createQuestion}
			formatOption={formatOption}
		/>
	);
}
