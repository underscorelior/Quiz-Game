module.exports = {
	plugins: [require('prettier-plugin-tailwindcss')],

	bracketSameLine: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	filepath: 'src/**/*{.js,.jsx,.ts,.tsx,.css,.scss,.html,.json,.md}',
	printWidth: 160,
};
