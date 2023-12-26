import { ACCESS_TYPE_FIELDS_MAPPING } from "..";
import { getUpdatedTimeframeDate } from "../../timeframe/helpers";
import { AccessType, MyFormValues, PartialRecord, ValidationError } from "../types";
import { duarationValidation } from "./range-duaration";

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
