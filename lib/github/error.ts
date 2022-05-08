interface HasStatus {
	status: number;
}

export const isErrorHasStatus = (raw: unknown): raw is HasStatus => {
	if (typeof raw !== "object") return false;
	if (raw === null) throw raw;
	if ("status" in raw) {
		return typeof (raw as HasStatus).status === "number";
	} else {
		return false;
	}
};
