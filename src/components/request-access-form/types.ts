import { TimingTypes } from "../timeframe/types";

export type AccessType = 'immediate' | 'scheduled';

export interface MyFormValues {
	accessType: AccessType;
    timeframeAmount: number;
    timeframeType: TimingTypes;
    startTime: string;
    endTime: string;
    reason: string;
}

export type AccessTypeFieldsMappingType = Record<AccessType, Array<keyof MyFormValues>>;

export type PartialRecord<K extends string | number | symbol, T> = {
    [P in K]?: T;
};

export type ValidationResponse = { error: boolean; msg?: string };
