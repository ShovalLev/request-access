import { ACCESS_TYPE_FIELDS_MAPPING } from '..';
import {
	AccessType,
	MyFormValues,
	PartialRecord,
	ValidationResponse,
} from '../types';
import {
	combineValidations,
	durationValidation,
	pastDatetimeValidation,
} from './helpers';
import { timeframesValidation } from './validation-methods';

const INPUT_VALIDATION: PartialRecord<
	keyof MyFormValues,
	(values: MyFormValues) => ValidationResponse
> = {
	timeframeAmount: timeframesValidation,
	timeframeType: timeframesValidation,
	startTime: (values) =>
		combineValidations(
			pastDatetimeValidation(values.startTime),
			durationValidation(
				new Date(values.startTime),
				new Date(values.endTime)
			)
		),
	endTime: (values) =>
		combineValidations(
			pastDatetimeValidation(values.endTime),
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
	const accessType = values.accessType;
	if (!accessType) {
		return;
	}

	return validateFormSection(accessType, values);
};
