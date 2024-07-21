interface Option {
	flag: string;
	name: string;
	capital: string | string[];
}

interface Quiz {
	question: React.ReactNode;
	options: string[]; // TODO: Maybe change to array of Option
	answer: {
		full: Option;
		format: string;
	};
}
