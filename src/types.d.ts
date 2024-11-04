interface Option {
	flag: string;
	name: string;
	capital: string | string[];
	short: string;
}

interface resultOption {
	option: Option;
	result: boolean;
}

interface Quiz {
	question: React.ReactNode;
	options: string[]; // TODO: Maybe change to array of Option
	answer: {
		full: Option;
		format: string;
	};
}
