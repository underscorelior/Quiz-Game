import React, { Component } from 'react';
import QuizButton from '../QuizButton';
import toast from 'react-hot-toast';
import Image from 'next/image';
import countries from '@/assets/us_states.json';

interface props {
	updateScore: () => void;
}

interface state {
	options: string[];
	answer: string;
	selectedOption: string;
	isChecked: boolean;
	flagUrl: string;
}

interface ConversionDict {
	[key: string]: string;
}

class FlagsQuiz extends Component<props, state> {
	constructor(props: props) {
		super(props);
		this.state = {
			options: [],
			answer: '',
			selectedOption: '',
			isChecked: false,
			flagUrl: '',
		};
	}

	handleOptionSelect = (option: string) => {
		this.setState({ selectedOption: option });
	};

	handleAnswerCheck = () => {
		const { selectedOption, answer } = this.state;
		const isCorrect = selectedOption === answer;
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'states-flag-score',
				String(
					parseInt(localStorage.getItem('states-flag-score') || '0') +
						(isCorrect ? 1 : 0),
				),
			);
		}
		this.props.updateScore();
		this.setState({ isChecked: true });
		toast(isCorrect ? 'Correct!' : `Incorrect! Correct Answer: ${answer}.`, {
			icon: isCorrect ? '✅' : '⛔',
			style: {
				borderRadius: '10px',
			},
		});
	};

	generateNextQuestion = async () => {
		try {
			// const conversion_dict: ConversionDict = {'ki': 'blqvQO5', 'bj': 'nv5ey2D', 'lb': '5aDnEwm', 'jm': 'UOlLiG0', 'me': 'MWDI5Qh', 'km': 'pRR443Y', 'zw': '8VhD8OO', 'td': 'Saog9fM', 'et': '6YkRITi', 'ad': 'ErerPTK', 'ag': 'BImOKVv', 'us': '4zZvn2y', 'gw': '99XqcVd', 'ca': 'rte4NsR', 'ke': '3lgTcli', 'cv': 'hptzYoM', 'ge': 'NDadr6h', 'sb': 'zhE05fS', 'cn': 'zhMDdkW', 'rw': 'KbSvT33', 'by': 'OChtm6g', 'pk': 'mMBJu2t', 'tl': 'PZ8ODax', 'sv': 'vEYpx8f', 'uy': 'z2fnP5j', 'at': '8zTwtMA', 'er': 'eHcLxX8', 'za': 'wzckzhz', 'zm': 'pLXMAH0', 'ne': 'kjNwlFR', 'la': '8LL4VIm', 'cy': '4ODQSaN', 'ec': 'JxlcA6V', 'lr': 'WfDT4XU', 'ug': 'ND40VSW', 'gt': '1KWrJMU', 'mm': 'FNX48dc', 'lu': 'GotFPdi', 'do': '3JU18ex', 'tj': '2Ur44W6', 'ml': 'J6chkHB', 've': 'czSsSk5', 'md': 'itRtL7A', 'se': 'NDg0h20', 'mv': '50SnuY3', 'gy': 'f2NKjFP', 'ph': 'YUENaHb', 'kh': 'sLIVd5W', 'mn': 'MSouXZ0', 'sy': 'dDF8M6D', 'il': '70zOb4F', 'mz': 'IRvLMus', 'au': 'eRPlNob', 'am': 'e3o1gSs', 'ws': 'GGOg8rW', 'fj': 'RURdLv4', 'my': 'gv0OtwK', 'to': '1IXMxWs', 'fr': 'R6VTI7G', 'lc': '00TP3ua', 'sr': 'ieCKrpo', 'bg': 'e0S8yHV', 'br': 'vob9M44', 'id': 'Gc54jgq', 'tv': 'sTlO1Z3', 'pw': 'nKoeRzg', 'jp': 'dOI8HoK', 'be': 'xqyWG5l', 'es': 'WD8WGrJ', 'is': 'ezRKz7Q', 'ie': 'qpRr126', 'kg': 'rSweYJS', 'sz': 'kzjZrnU', 'gd': 'SHfkWiu', 'bi': 'C4y1Bfw', 'tt': 'QcWHOpj', 'jo': 'dIF8tW5', 'lt': 'lCYFSCD', 'ma': 'WuefGPa', 'nl': 'dhmJGMq', 'ps': 'WN4DF0a', 'co': 'YliBw4f', 'bz': 'yCHjltn', 'mu': 'JkZWIma', 'bt': 'S4kHuGc', 'dj': 'ShbFI3L', 'ee': '0Q2UotU', 'bf': 'vYzOgYB', 'va': '0ahqHiy', 'gn': 'Yccia6S', 'ua': 'Zl8qBUN', 'sm': 'p0Jffe8', 'pl': '39gozys', 'pa': 'y8W8F8V', 'cl': '18yQGvO', 'pt': 'AJLb985', 'bw': 'XcM9Hq4', 'ga': 'LUDo4fb', 'tm': '8StySwd', 'it': 'O4VPVa8', 'mg': '9RlIQnK', 'cd': 'oIfgEtU', 'vn': 'U5OBShR', 'dm': 'xQSlKoU', 'fm': 'me7jhAl', 'tr': 'm93cKKX', 'kz': 'qUKwEXI', 'ro': 'A4KliOJ', 'lv': 'sUUaJ1o', 'tn': 'rsrGRBr', 'dk': 'tcLMu0G', 'hu': 'xRQRCqQ', 'uz': 'fQUqhsG', 'ru': 'T0wczj2', 'gh': 'bUVrCmg', 'cg': 'kjq7nwk', 'ao': 'boCjcdp', 'ch': 'cKgjTfB', 'tw': 'uhsc806', 'mk': 'qmIOwjG', 'sl': 'IfmIq6A', 'cz': 'Ma5MdRF', 'pe': 'PAYWQYr', 'bn': 'nSaMMUn', 'ye': 'epIeB7g', 'hr': '9djQwHi', 'ly': 'KHhRORM', 'py': 'YKi1RFi', 'li': 'TRLMjUX', 'sk': 'xTOfrQN', 'eg': 'wAwvoQd', 'lk': 'Gs1zpEn', 'rs': 'T61eqw4', 'sn': 'MGz7jN9', 'nz': 'dBC4AFP', 'kp': 'O4xTZW1', 'dz': 'jatjKqn', 'so': 's9TdBoq', 'sd': 'MUpHw8K', 'ng': 'QQ8XIaI', 'mh': '71ORTAs', 'al': 'c1SVeiS', 'bo': 'xOyV5gq', 'pg': 'u6ooN3y', 'qa': 'zRiE1Tj', 'bb': 'uQ7iglf', 'cr': 'X70umxR', 'sc': 'ITwVTkW', 'af': 'SdZQkfd', 'nr': 'vCmPwzV', 'gr': 'jV8jdoU', 'ni': 'doXHHmu', 'ae': 'sb9UKsP', 'cm': 'nGuKEnt', 'ir': 'CzTj9mj', 'mc': 'IbtWWFR', 'ar': '9M4Gc4r', 'mx': 'W1XlBdq', 'mr': 'JhV8vCe', 'in': 'pJA4rla', 'az': 'zpGZKz1', 'hn': 'Tw4oX1P', 'tz': 'ZlbK56m', 'iq': '3uSUadj', 'bh': '3uHaGr7', 'kr': 'VUs8mLJ', 'gq': '06xfdjm', 'ls': 'MtWZCKx', 'np': 'St5pgHp', 'om': 'JP1rRQk', 'de': 'ViPzcbJ', 'ba': 'sBPUW1I', 'kn': 'ea4BYto', 'st': 'OE9BWqe', 'bs': '11SLq2R', 'no': '7pX4bRA', 'na': 'KPzgbdI', 'vu': 'jqkCSJX', 'tg': '7xLy96l', 'sg': '0BIlGYF', 'bd': '3PigkpH', 'gm': 'cx6zKvY', 'si': 'MN9ynGc', 'ci': 'jwCvkeL', 'cu': 'GoJAr6b', 'mt': 'LuhkxXG', 'fi': 'hW22Cl2', 'ss': 'DneqoxB', 'mw': 'fQnsv9y', 'ht': 'xboTTGS', 'gb': 'n1Dza0f', 'sa': '8KXBsun', 'kw': 'cEDWpGE', 'cf': 'Sg8NkoE', 'vc': 'LiYNNbd', 'th': 'Rx620Er'}
			const randomIndex = Math.floor(Math.random() * countries.length);
			const country = countries[randomIndex];

			let options = [country.name];

			while (options.length < 4) {
				const randomIndex = Math.floor(Math.random() * countries.length);

				const optionName = countries[randomIndex].name;
				const option = Array.isArray(optionName)
					? optionName.join(', ')
					: optionName;

				if (!options.includes(option)) {
					options.push(option);
				}
			}

			for (let i = options.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[options[i], options[j]] = [options[j], options[i]];
			}

			this.setState({
				options,
				answer: country.name,
				isChecked: false,
				selectedOption: '',
				flagUrl: `${country.flags
					.replace('w320/', '')
					.replace('.png', '.svg')}`,
			});
		} catch (error) {
			console.error(error);
			toast.error(
				'Could not load countries. Please check your internet connection.',
			);
		}
	};

	componentDidMount() {
		this.generateNextQuestion();
		window.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress = (event: KeyboardEvent) => {
		const { options } = this.state;
		const key = event.key;

		if (key === 'Enter' && this.state.selectedOption !== '') {
			if (!this.state.isChecked) {
				this.handleAnswerCheck();
			} else {
				this.generateNextQuestion();
			}
		}

		if (
			!isNaN(parseInt(key)) &&
			options[parseInt(key) - 1] &&
			!this.state.isChecked
		) {
			this.setState({ selectedOption: options[parseInt(key) - 1] });
		}
	};

	render() {
		const { flagUrl, options, selectedOption, isChecked } = this.state;
		const isDisabled = selectedOption === '';

		return (
			<section className="flex w-full flex-col items-center justify-center gap-y-4">
				<Image
					src={flagUrl}
					className="m-2 h-[256px] w-auto select-none rounded-lg border-2 border-neutral-50"
					alt="Flag of country"
					width={256}
					draggable={false}
					height={256}
				/>
				<section className="flex min-w-[80%] max-w-[80%] flex-col gap-y-3 md:min-w-[40%] md:max-w-[40%]">
					{options.map((option, index) => (
						<QuizButton
							key={index}
							option={option}
							isSelected={selectedOption === option}
							isCorrect={(option === this.state.answer) === isChecked}
							isDisabled={isChecked}
							onClick={this.handleOptionSelect}
						/>
					))}
					{!isChecked ? (
						<button
							className={'quiz-button-check'}
							onClick={this.handleAnswerCheck}
							disabled={isChecked || isDisabled}>
							Check Answer
						</button>
					) : (
						<button
							className="quiz-button-next"
							onClick={this.generateNextQuestion}>
							Next Question
						</button>
					)}
				</section>
			</section>
		);
	}
}

export default FlagsQuiz;
