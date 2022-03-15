import { AppErrorBase } from "./base";

export const AppError404 = (): JSX.Element => (
	<AppErrorBase title="404">
		It means this page could not be found.
	</AppErrorBase>
);
