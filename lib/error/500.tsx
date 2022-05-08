import { ErrorBase } from "./base";

export const Error500 = (): JSX.Element => (
	<ErrorBase title="500">
		It means there&apos;s something wrong but we don&apos;t know why yet. If
		you report this, we can look at it.
	</ErrorBase>
);
