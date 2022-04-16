import { ErrorBase } from "./base";

export const Error404 = (): JSX.Element => (
	<ErrorBase title="404">It means this page could not be found.</ErrorBase>
);
