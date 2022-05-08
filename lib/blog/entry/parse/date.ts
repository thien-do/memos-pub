import { BlogConfigDate } from "@/lib/config/type";
import { BlogEntry } from "../type";

const DETAILS: Record<BlogConfigDate, Detail> = {
	"yyyy-mm-dd ": {
		pattern: /(\d{4})-(\d{2})-(\d{2}) (.+)/,
		ymdIndexes: [0, 1, 2],
	},
	"mm.dd.yyyy - ": {
		pattern: /(\d{2})\.(\d{2})\.(\d{4}) - (.+)/,
		ymdIndexes: [2, 0, 1],
	},
};

interface Detail {
	pattern: RegExp;
	// where is year, month, day in pattern
	ymdIndexes: [number, number, number];
}

interface Props {
	format: BlogConfigDate;
	name: string;
}

interface Output {
	date: BlogEntry["date"];
	rest: string;
}

export const parseBlogEntryDate = (props: Props): Output => {
	const { name, format } = props;
	const { pattern, ymdIndexes } = DETAILS[format];
	const match = props.name.match(pattern);
	if (match === null) return { date: null, rest: name };

	const [yi, mi, di] = ymdIndexes;
	const [y, m, d] = [match[yi + 1], match[mi + 1], match[di + 1]];
	const date = `${y}-${m}-${d}`; // Always ISO

	const rest = match[4];
	return { date, rest };
};
