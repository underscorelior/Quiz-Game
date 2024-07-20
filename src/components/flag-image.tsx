import Image from 'next/image';

export default function FlagImage({ url }: { url: string }) {
	return (
		<div className=''>
			<Image
				// className='h-full max-h-[40%] w-auto max-w-[40%] select-none overflow-clip rounded-lg border-2 border-zinc-800'
				src={url}
				alt='Flag'
				// loading='eager'
				width={256}
				draggable={false}
				height={256}
			/>
		</div>
	);
}
