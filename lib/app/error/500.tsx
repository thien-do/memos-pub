import { AppErrorBase } from "./base";

export const AppError500 = (): JSX.Element => (
	<AppErrorBase title="500">
		It means there&apos;s something wrong but we don&apos;t know why yet. If
		you report this, we can look at it.
	</AppErrorBase>
);
