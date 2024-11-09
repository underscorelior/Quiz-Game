'use client';
import USMapSVG from '@/assets/maps/us';

//TODO: when dragging disable selection

export default function ClickMap({
	onMouseUp,
	// onMouseUp: click,
}: {
	// onMouseUp: (clicked: string) => resultOption[];
	onMouseUp: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}) {
	// function onMouseUp(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
	// 	const name = (e.target as SVGElement).getAttribute('class') || '';

	// 	const state =
	// 		(e.target as SVGElement).getAttribute('data-answer-state') || '';

	// 	if (
	// 		name.includes('sep') ||
	// 		name.includes('-') ||
	// 		name.length == 0 ||
	// 		state.length != 0
	// 	)
	// 		return;

	// 	const ans = click(name);

	// 	ans.forEach((ans) => {
	// 		findElementFromName(ans.option.short).setAttribute(
	// 			'data-answer-state',
	// 			ans.result ? 'correct' : 'wrong',
	// 		);
	// 	});
	// }

	// function findElementFromName(short: string) {
	// 	if (short == 'dc') {
	// 		const elms = document.getElementsByClassName(short);

	// 		for (let i = 0; elms.length > i; i++) {
	// 			if (elms[i].nodeName == 'circle') return elms[i];
	// 		}
	// 	}

	// 	return document.getElementsByClassName(short)[0];
	// }

	return (
		<USMapSVG
			onMouseUp={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
				onMouseUp(e);
			}}
		/>
	);
}
