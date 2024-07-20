import Image from 'next/image';

export default function FlagImage({ url }: { url: string }) {
	return (
		<div className='flex aspect-video max-h-[50%] min-h-[50%] w-auto'>
			<Image
				className='object-fit h-full w-auto rounded-lg border-4 border-zinc-800'
				width={1600}
				height={900}
				src={url}
				alt='Flag'
			/>
		</div>
	);
}
