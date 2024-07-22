import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center gap-y-6 p-24 text-2xl font-semibold'>
			<Link href={'/capitals/us'}>US Capitals</Link>
			<Link href={'/flags/us'}>US Flags</Link>
			<Link href={'/capitals/world'}>World Capitals</Link>
			<Link href={'/flags/world'}>World Flags</Link>
		</main>
	);
}
