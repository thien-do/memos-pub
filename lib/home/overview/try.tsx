import { useState } from "react";

export const HomeOverviewTry = (): JSX.Element => {
	const [text, setText] = useState("");
	return (
		<form
			className={[
				"w-full max-w-xs flex",
				"shadow-sm transition-shadow",
				"focus-within:ring-2 focus-within:ring-indigo-500",
			].join(" ")}
			onSubmit={(event) => {
				if (text === "") return;
				event.preventDefault();
				location.assign(`/#${text}`);
				location.reload();
			}}
		>
			<input
				className={[
					"flex-1 px-4 py-3 border-none",
					"bg-white dark:bg-gray-900",
					"placeholder-gray-400 dark:placeholder-gray-600",
					"focus:ring-0 text-base",
				].join(" ")}
				type="text"
				value={text}
				onChange={(event) => setText(event.target.value)}
				placeholder="https://github.com/path"
			/>
			<button
				type="submit"
				className={[
					"flex-0 px-4 py-3 rounded-none",
					"outline-none focus:outline-none focus:underline",
					"bg-white dark:bg-gray-900",
					"transition-all",
					"text-base text-indigo-500 font-semibold",
				].join(" ")}
			>
				Go
			</button>
		</form>
	);
};
