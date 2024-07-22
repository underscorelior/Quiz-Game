// Convert string or string array to string
export function arrStrToStr(str: string | string[]): string {
	return Array.isArray(str) ? str.join(', ') : str;
}

export function randomElement(arr: object[]): object {
	return arr[Math.floor(Math.random() * arr.length)];
}
