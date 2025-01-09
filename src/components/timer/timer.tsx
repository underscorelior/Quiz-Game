import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

import Image from 'next/image';

interface TimerHandle {
	start: () => void;
	stop: () => void;
	reset: () => void;
}

const Timer = forwardRef<
	TimerHandle,
	{ className?: string; hideBtn: boolean; decimalPaused: boolean }
>(({ className, hideBtn, decimalPaused }, ref) => {
	const [time, setTime] = useState<number>(0);
	const [stopped, setStopped] = useState<boolean>(false);
	const [hide, setHide] = useState<boolean>(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	function start() {
		if (!intervalRef.current) {
			intervalRef.current = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 10);
		}
		setStopped(false);
	}

	function stop() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setStopped(true);
	}

	function reset() {
		stop();
		setTime(0);
	}

	useImperativeHandle(ref, () => ({
		start,
		stop,
		reset,
		setHide,
	}));

	return (
		<div className={`flex gap-2 ${className}`}>
			<div className='relative font-mono'>
				{hide && (
					<div className='absolute left-0 top-1/2 w-full -translate-y-1/2 transform p-3 backdrop-blur'></div>
				)}
				{hide
					? 10
					: decimalPaused && stopped
						? (time / 100).toFixed(2)
						: Math.floor(time / 100)}
				s
			</div>

			{hideBtn && (
				<button
					onClick={() => {
						setHide((hide) => !hide);
					}}
				>
					<Image
						src={hide ? '/eye-slash-solid.svg' : '/eye-solid.svg'}
						width={16}
						height={16}
						alt={'eye'}
						className='h-5 w-5'
					/>
				</button>
			)}
		</div>
	);
});

Timer.displayName = 'Timer';
export default Timer;
