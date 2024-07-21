import { cn } from '@/utils/cn';

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-md bg-stone-500/10 dark:bg-stone-500/10',
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
