import { ACCESS_TYPE_FIELDS_MAPPING } from '..';
import { getUpdatedTimeframeDate } from '../../timeframe/helpers';
import {
	AccessType,
	MyFormValues,
	PartialRecord,
	ValidationResponse,
} from '../types';
import { durationValidation, pastDatetimeValidation } from './range-duaration';

/*
    This function gets an Array of validation callbacks, and returns the first validation with an error.
    It won't execute all callback, instead execute one by one untill getting an error. 
*/
type ValidationMethod = () => ValidationResponse;
const combineValidations = (
	...args: Array<ValidationMethod>
): ValidationResponse => {
	for (const validationCallback of args) {
		const validationRes = validationCallback();
		if (validationRes.error) {
			return validationRes;
		}
	}

	return { error: false };
};

const INPUT_VALIDATION: PartialRecord<
	keyof MyFormValues,
	(values: MyFormValues) => ValidationResponse
> = {
	timeframeAmount: (values) => {
		const currentDate = new Date();
		return durationValidation(
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
		return durationValidation(
			currentDate,
			getUpdatedTimeframeDate(
				currentDate,
				values.timeframeAmount,
				values.timeframeType
			)
		);
	},
	startTime: (values) =>
		combineValidations(
			() => pastDatetimeValidation(values.startTime),
			() =>
				durationValidation(
					new Date(values.startTime),
					new Date(values.endTime)
				)
		),
	endTime: (values) =>
		combineValidations(
			() => pastDatetimeValidation(values.endTime),
			() =>
				durationValidation(
					new Date(values.startTime),
					new Date(values.endTime)
				)
		),
};

const validateFormSection = (
	accessType: AccessType,
	values: MyFormValues
): PartialRecord<keyof MyFormValues, string> => {
	let errors: PartialRecord<keyof MyFormValues, string> = {};
	ACCESS_TYPE_FIELDS_MAPPING[accessType].forEach((field) => {
		const validationFunction = INPUT_VALIDATION[field];
		if (!values[field]) {
			errors[field] = 'Required';
		} else if (validationFunction) {
			let error: ValidationResponse = validationFunction(values);
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
