import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
	'inline-flex max-w-[40%] items-center justify-center whitespace-nowrap rounded-md border-2 bg-200% transition-colors focus-visible:outline-none disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				default:
					'bg-white enabled:hover:border-zinc-500 enabled:hover:bg-zinc-50 disabled:text-zinc-600',
				selected: 'bg-zinc-200 border-zinc-600',
				correct:
					'bg-[linear-gradient(to_right,#22c55e_50%,#f5f5f4_50%)] border-zinc-500',
				wrong:
					'bg-[linear-gradient(to_right,#ef4444_50%,#f5f5f4_50%)] border-zinc-500',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				xl: 'h-11 rounded-md p-6 px-7 text-lg',
				icon: 'h-10 w-10',
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
				<p className='text-center text-sm font-medium'>{content}</p>
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
