import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const outerButton = cva(
	'inline-flex group w-full items-center justify-center rounded-md bg-300% transition-colors focus-visible:outline-none p-[3px] disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				default: 'bg-white enabled:hover:border-zinc-400 border-3 p-0',
				selected: 'border-zinc-500 border-3 p-0',
				correct: 'bg-[linear-gradient(130deg,#22c55e_55%,#71717a_45%)]',
				wrong: 'bg-[linear-gradient(130deg,#ef4444_55%,#71717a_45%)]',
				correct_unsel:
					'bg-[linear-gradient(130deg,#22c55e90_55%,#71717a_45%)] animate-correct-unsel border-0 animate-shake',
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
	'w-full rounded-[3px] text-center text-base font-medium flex items-center justify-center',
	{
		variants: {
			variant: {
				default:
					'bg-white group-enabled:group-hover:bg-zinc-50 group-disabled:text-zinc-400 group-disabled:transition-colors group-disabled:duration-200',
				selected: 'bg-zinc-100',
				correct: 'bg-zinc-100',
				wrong: 'bg-zinc-100',
				correct_unsel:
					'bg-white group-enabled:group-hover:bg-zinc-50 group-disabled:text-zinc-400 group-disabled:transition-colors group-disabled:duration-200',
			},
			size: {
				default: 'h-12 p-4',
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
	function x() {
		if (submitted) {
			if (selected) {
				if (correct) {
					('correct');
				} else {
					('wrong');
				}
			} else {
				if (correct) {
					('correct_unsel');
				} else {
					('default');
				}
			}
		} else {
			if (selected) {
				('selected');
			} else {
				('default');
			}
		}
	}
	return (
		// If submitted, selected and correct = correct
		// If submitted, selected, and not correct = wrong
		// if Submitted, not selected, and correct = correct_unsel
		// if not submitted, selected = selected
		// If not submitted, not selected = default
		<Button
			variant={
				submitted
					? selected
						? correct
							? 'correct'
							: 'wrong'
						: correct
							? 'correct_unsel'
							: 'default'
					: selected
						? 'selected'
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

export function EtcQuizButton({
	disabled,
	onClick,
	className,
	children,
}: {
	disabled?: boolean;
	onClick: () => void;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<button
			disabled={disabled}
			onClick={() => {
				onClick();
			}}
			className='rounded-md border-2 border-zinc-500 px-6 py-2 text-lg font-medium text-zinc-800 enabled:hover:border-zinc-700 enabled:hover:bg-zinc-100 disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-50 disabled:text-zinc-500'
		>
			{children}
		</button>
	);
}
