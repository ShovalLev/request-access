import { getUpdatedTimeframeDate } from '../../timeframe/helpers';
import { MyFormValues } from '../types';
import { durationValidation } from './helpers';

export const timeframesValidation = (values: MyFormValues) => {
	const currentDate = new Date();
	const timeframeDate: Date = getUpdatedTimeframeDate(
		currentDate,
		values.timeframeAmount,
		values.timeframeType
	);
	return durationValidation(currentDate, timeframeDate);
};
