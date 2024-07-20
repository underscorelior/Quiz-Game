import Image from 'next/image';

export default function FlagImage({ url }: { url: string }) {
	return (
		<div className='relative flex aspect-video h-[50%] w-auto items-center justify-center overflow-hidden'>
			<Image
				className='aspect-video h-full w-auto rounded-lg border-4 border-zinc-800'
				fill
				src={url}
				alt='Flag'
				loading='eager'
			/>
		</div>
	);
}
