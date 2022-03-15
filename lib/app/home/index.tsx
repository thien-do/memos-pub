import Markdown from "./body.md";
import { useAppHomeRedirect } from "./redirect";

export const AppHome = (): JSX.Element => {
	useAppHomeRedirect();
	return <Markdown />;
};
