module.exports = {
	i18n: {
		locales: ['en', 'es', 'cat'],
		defaultLocale: 'en',
	},
	webpack: (config, { dev, isServer }) => {
		config.module.rules.push({
			test: /\.html/,
			use: "raw-loader",
		})

		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: "preact/compat",
				"react-dom": "preact/compat",
			})
		}

		return config
	},
};