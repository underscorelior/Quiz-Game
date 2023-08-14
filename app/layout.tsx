import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Countries Quiz',
	description: 'A simple quiz for flags and capitals of countries.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className + "min-h-screen h-full bg-black"}>{children}</body>
		</html>
	);
}
