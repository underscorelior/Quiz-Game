import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const outerButton = cva(
	'inline-flex group w-full items-center justify-center whitespace-nowrap rounded-md bg-300% transition-colors focus-visible:outline-none p-[3px] disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				default: 'bg-white enabled:hover:border-zinc-400 border-3 p-0',
				selected: 'border-zinc-500 border-3 p-0',
				correct: 'bg-[linear-gradient(130deg,#22c55e_55%,#71717a_45%)]',
				wrong: 'bg-[linear-gradient(130deg,#ef4444_55%,#71717a_45%)]',
			},
			answered: {
				true: '',
				false: '',
			},
		},
		compoundVariants: [
			{
				variant: ['correct', 'wrong'],
				answered: true,
				className: 'animate-answered fill-mode-[forwards]',
			},
		],
	},
);

const buttonVariants = cva(
	'w-full rounded-[4px] text-center text-sm font-medium flex items-center justify-center',
	{
		variants: {
			variant: {
				default:
					'bg-white group-enabled:group-hover:bg-zinc-50 group-disabled:text-zinc-400 group-disabled:transition-colors group-disabled:duration-200',
				selected: 'bg-zinc-100',
				correct: 'bg-zinc-100',
				wrong: 'bg-zinc-100',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				xl: 'h-11 rounded-md p-6 px-7 text-lg',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants>,
		VariantProps<typeof outerButton> {
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
				className={cn(outerButton({ answered, variant, className }))}
				ref={ref}
				{...props}
			>
				<span className={cn(buttonVariants({ size, variant, className }))}>
					{content}
				</span>
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
	className,
}: {
	option: string;
	submitted: boolean;
	selected: boolean;
	correct: boolean;
	onClick: (option: string) => void;
	className?: string;
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
			className={className}
		/>
	);
}
