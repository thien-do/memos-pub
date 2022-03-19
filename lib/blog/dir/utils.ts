// yyyy mm dd format
const DATE_REGEX = /^\d{4}[-/.]\d{2}[-/.]\d{2}/;

export const getEntryInfo = (
	entryName: string
): { date?: string; title: string } => {
	const date = entryName.match(DATE_REGEX)?.[0];
	if (date) {
		return {
			date,
			title: entryName.replace(date, ""),
		};
	}
	return {
		date,
		title: entryName,
	};
};
