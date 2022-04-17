module.exports = {
	i18n: {
		locales: ['en', 'es', 'cat'],
		defaultLocale: 'en',
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.csv/,
			loader: "csv-loader",
			options: {
				header: true,
				skipEmptyLines: true
			}
		})

		return config
	},
};