import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
	'text-center inline-flex items-center min-w-[40%] justify-center border-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed bg-200%',
	{
		variants: {
			variant: {
				default: 'bg-zinc-50 dark:bg-zinc-950',
				selected: 'bg-stone-100 dark:bg-stone-900',
				correct: 'bg-green-500',
				wrong: 'bg-red-500',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				xl: 'h-11 rounded-md p-6 px-7 text-lg',
				xl2: 'h-11 rounded-md p-7 text-xl',
				icon: 'h-10 w-10',
				info: 'p-0 text-lg font-medium',
			},
			answered: {
				true: 'animate-answered fill-mode-[forwards]',
				false: '',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
			answered: false,
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	content: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, size, answered, content, asChild = false, ...props },
		ref,
	) => {
		return (
			<button
				className={cn(buttonVariants({ answered, variant, size, className }))}
				ref={ref}
				{...props}
			>
				<p className='text-center'>{content}</p>
			</button>
		);
	},
);
Button.displayName = 'Button';

export default function QuizButton({
	option,
	submitted,
	selected,
	correct,
	onClick,
}: {
	option: string;
	submitted: boolean;
	selected: boolean;
	correct: boolean;
	onClick: (option: string) => void;
}) {
	return (
		<Button
			variant={
				selected
					? submitted
						? correct
							? 'correct'
							: 'wrong'
						: 'selected'
					: 'default'
			}
			answered={submitted}
			content={option}
			disabled={submitted}
			onClick={() => {
				onClick(option);
			}}
		/>
	);
}
