import { ValidationResponse } from '../types';

const MIN_LIMIT_RANGE_MS = 30 * 60 * 1000; // min 30 minutes
const MAX_LIMIT_RANGE_MS = 24 * 60 * 60 * 1000; // max 24 hours

const parseDate = (date?: string | Date) => {
	if (typeof date === 'string') {
		return new Date(date);
	} else if (date instanceof Date && !isNaN(date.getTime())) {
		return date;
	}
	return undefined;
};

export const durationValidation = (
	startDate?: string | Date,
	endDate?: string | Date
): ValidationResponse => {
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
			timeDifference >= MIN_LIMIT_RANGE_MS &&
			timeDifference <= MAX_LIMIT_RANGE_MS
		)
	) {
		return {
			error: true,
			msg: 'Meeting duration ranges from a min of 30 minutes to a max of 24 hours.',
		};
	}
	return { error: false };
};

export const pastDatetimeValidation = (dt?: string | Date) => {
	const dateTime = parseDate(dt);

	if (!dateTime) {
		return { error: false };
	}

	const timeDifference =  dateTime.getTime() - Date.now();

	if (timeDifference < 0) {
		return { error: true, msg: 'Datetime can not be in the past' };
	}
	return { error: false };
};
