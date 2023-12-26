import { ACCESS_TYPE_FIELDS_MAPPING } from '.';
import { TimingTypes } from '../timeframe/types';
import {
	AccessType,
	MyFormValues,
	PartialRecord,
	ValidationError,
} from './types';

const MIN_LIMIT_RANGE = 30 * 60 * 1000; // min 30 minutes
const MAX_LIMIT_RANGE = 24 * 60 * 60 * 1000; // max 24 hours

const parseDate = (date?: string | Date) => {
    if (typeof date === 'string') {
		return new Date(date);
	} else if (date instanceof Date && !isNaN(date.getTime())) {
		return date;
	}
    return undefined;
}

const duarationValidation = (
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

const timeframeRangeConvertionMapping: Record<
	TimingTypes,
	(value: number) => number
> = {
	[TimingTypes.Seconds]: (value: number) => value * 1000,
	[TimingTypes.Minutes]: (value: number) => value * 60000,
	[TimingTypes.Hours]: (value: number) => value * 3600000,
};
const getUpdatedTimeframeDate = (
	currentDate: Date,
	amount: number,
	type: TimingTypes
): Date => {
	return new Date(
		currentDate.getTime() + timeframeRangeConvertionMapping[type](amount)
	);
};

const INPUT_VALIDATION: PartialRecord<
	keyof MyFormValues,
	(values: MyFormValues) => ValidationError
> = {
	timeframeAmount: (values) => {
		const currentDate = new Date();
		return duarationValidation(
			currentDate,
			getUpdatedTimeframeDate(
				currentDate,
				values.timeframeAmount,
				values.timeframeType
			)
		);
	},
	timeframeType: (values) => {
		const currentDate = new Date();
		return duarationValidation(
			currentDate,
			getUpdatedTimeframeDate(
				currentDate,
				values.timeframeAmount,
				values.timeframeType
			)
		);
	},
	startTime: (values) =>
		duarationValidation(
			new Date(values.startTime),
			new Date(values.endTime)
		),
	endTime: (values) =>
		duarationValidation(
			new Date(values.startTime),
			new Date(values.endTime)
		),
};

const validateFormSection = (accessType: AccessType, values: MyFormValues) => {
	let errors: PartialRecord<keyof MyFormValues, string> = {};
	ACCESS_TYPE_FIELDS_MAPPING[accessType].forEach((field) => {
		const validationFunction = INPUT_VALIDATION[field];
		if (!values[field]) {
			errors[field] = 'Required';
		} else if (validationFunction) {
			let error = validationFunction(values);
			if (error?.error) {
				errors[field] = error.msg;
			}
		}
	});

	return errors;
};

export const validateForm = (values: MyFormValues) => {
	let errors: PartialRecord<keyof MyFormValues, string> = {};
	const accessType = values.accessType;
	if (!accessType) {
		return;
	}

	errors = validateFormSection(accessType, values);
	return errors;
};
