import { TimingTypes } from "./types";

const timeframeRangeConvertionMapping: Record<
	TimingTypes,
	(value: number) => number
> = {
	[TimingTypes.Seconds]: (value: number) => value * 1000,
	[TimingTypes.Minutes]: (value: number) => value * 60000,
	[TimingTypes.Hours]: (value: number) => value * 3600000,
};

export const getUpdatedTimeframeDate = (
	currentDate: Date,
	amount: number,
	type: TimingTypes
): Date => {
	return new Date(
		currentDate.getTime() + timeframeRangeConvertionMapping[type](amount)
	);
};
