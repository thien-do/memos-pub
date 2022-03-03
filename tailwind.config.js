module.exports = {
	content: ["./pages/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
	theme: {
		// Tailwind's breakpoints but minus 20px so it's the same with or without
		// scrollbar
		screens: {
			sm: "620px",
			md: "748px",
			lg: "1004px",
			xl: "1260px",
			"2xl": "1516px",
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
