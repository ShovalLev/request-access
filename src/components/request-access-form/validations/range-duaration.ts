const MIN_LIMIT_RANGE = 30 * 60 * 1000; // min 30 minutes
const MAX_LIMIT_RANGE = 24 * 60 * 60 * 1000; // max 24 hours

const parseDate = (date?: string | Date) => {
	if (typeof date === 'string') {
		return new Date(date);
	} else if (date instanceof Date && !isNaN(date.getTime())) {
		return date;
	}
	return undefined;
};

export const duarationValidation = (
	startDate?: string | Date,
	endDate?: string | Date
) => {
	const startTime = parseDate(startDate);
	const endTime = parseDate(endDate);

	if (!startTime || !endTime) {
		return { error: false };
	}

	const timeDifference = endTime.getTime() - startTime.getTime();

	if (timeDifference < 0)
		return { error: true, msg: 'End date must be after Start date' };
	if (
		!(
			timeDifference >= MIN_LIMIT_RANGE &&
			timeDifference <= MAX_LIMIT_RANGE
		)
	) {
		return {
			error: true,
			msg: 'min of 30 minutes and a max of 24 hours per a meeting',
		};
	}
	return { error: false };
};