import { ValidationResponse } from '../types';

const MIN_LIMIT_RANGE_MS = 30 * 60 * 1000; // min 30 minutes
const MAX_LIMIT_RANGE_MS = 24 * 60 * 60 * 1000; // max 24 hours

export enum VALIDATION_ERROR_MESSAGES {
	REQUIRED = 'Required',
	INVALID_MEETING_DURATION = 'Invalid meeting duration',
	MIN_MAX_DURATION = 'Meeting duration ranges from a min of 30 minutes to a max of 24 hours.',
	PAST_DATETIME = 'Datetime can not be in the past',
}

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
		return {
			error: true,
			msg: VALIDATION_ERROR_MESSAGES.INVALID_MEETING_DURATION,
		};
	if (
		!(
			timeDifference >= MIN_LIMIT_RANGE_MS &&
			timeDifference <= MAX_LIMIT_RANGE_MS
		)
	) {
		return {
			error: true,
			msg: VALIDATION_ERROR_MESSAGES.MIN_MAX_DURATION,
		};
	}
	return { error: false };
};

export const pastDatetimeValidation = (dt?: string | Date) => {
	const dateTime = parseDate(dt);

	if (!dateTime) {
		return { error: false };
	}

	const timeDifference = dateTime.getTime() - Date.now();

	if (timeDifference < 0) {
		return { error: true, msg: VALIDATION_ERROR_MESSAGES.PAST_DATETIME };
	}
	return { error: false };
};

export const combineValidations = (
	...args: Array<ValidationResponse>
): ValidationResponse => {
	for (const validationRes of args) {
		if (validationRes.error) {
			return validationRes;
		}
	}

	return { error: false };
};
