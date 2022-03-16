import { useState } from "react";

export const AppHomeTry = (): JSX.Element => {
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
					"flex-1 px-4 py-3 bg-white border-none",
					"focus:ring-0 text-base placeholder-gray-400",
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
					"transition-all bg-white",
					"text-base text-indigo-500 font-semibold",
				].join(" ")}
			>
				Go
			</button>
		</form>
	);
};
