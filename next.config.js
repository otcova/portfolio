module.exports = {
	i18n: {
		locales: ['en', 'es', 'cat'],
		defaultLocale: 'en',
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.html/,
			use: "raw-loader",
		})

		return config
	},
};