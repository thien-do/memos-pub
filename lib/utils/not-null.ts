export const isNotNull = <Value>(value: Value | null): value is Value => {
	if (value === null) return false;
	// https://stackoverflow.com/a/46700791
	const _test: Value = value;
	return true;
};
