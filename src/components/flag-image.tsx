import Image from 'next/image';

export default function FlagImage({ url }: { url: string }) {
	return (
		<div className='flex h-[12rem] min-h-[12rem] items-center justify-center'>
			<Image
				className='mx-auto h-auto max-h-[12rem] min-h-[12rem] w-auto min-w-[12rem] select-none overflow-clip rounded-lg border-2 border-zinc-800 bg-slate-50'
				src={url}
				alt='Flag'
				width={256}
				draggable={false}
				height={256}
			/>
		</div>
	);
}
