interface Option {
	flag: string;
	name: string;
	capital: string[];
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

interface CountryData {
	name: string;
	capital: string[];
	short: string;
	flag: {
		url: string;
		svg: string;
		colors: string[];
		shapes: string[];
		elements: string[];
	};
	geography: {
		continents: string[];
		region: string;
		subregion: string;
		landlocked: boolean | null;
		borders: string[];
	};
}
