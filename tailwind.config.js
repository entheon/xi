export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto"]
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
	],
	darkMode: "selector",
}
