export function randomElement(arr: object[]): object {
	return arr[Math.floor(Math.random() * arr.length)];
}
