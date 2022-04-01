/**
 * Return a string in ISO 8601 format according to local time.
 * @param d
 */
export const toISOString = (d: Date): string => {
	function f(n: number): string {
		return n < 10 ? "0" + n : String(n);
	}

	// YYYY-MM-DDTHH:mm:ss.sssZ
	return d.getFullYear() + "-" +
		f(d.getMonth() + 1) + "-" +
		f(d.getDate()) + "T" +
		f(d.getHours()) + ":" +
		f(d.getMinutes()) + ":" +
		f(d.getSeconds()) + "." +
		(d.getMilliseconds() / 1000).toFixed(3).slice(2, 5) + "Z";
};
