import { useMemo } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { validateForm } from './validations';
import { AccessTypeFieldsMappingType, MyFormValues } from './types';
import {
	ImmediateSection,
	ScheduledSection,
	AdditionalInfo,
	FormActions,
} from './components';
import styles from './styles.module.css';
import { mockRequest } from '../../mock-request';
import { TimingTypes } from '../timeframe/types';

export const ACCESS_TYPE_FIELDS_MAPPING: AccessTypeFieldsMappingType = {
	immediate: ['timeframeAmount', 'timeframeType', 'reason'],
	scheduled: ['startTime', 'endTime', 'reason'],
};

export interface RequestAccessFormProps {
	onCancel: () => void;
}

export default function RequestAccessForm({
	onCancel,
}: RequestAccessFormProps) {
	const initialValues: MyFormValues = useMemo(() => {
		return {
			accessType: 'immediate',
			timeframeAmount: 1,
			timeframeType: TimingTypes.Hours,
			startTime: '',
			endTime: '',
			reason: '',
		};
	}, []);

	const handleSubmit = async (
		values: MyFormValues,
		{ setSubmitting }: FormikHelpers<MyFormValues>
	) => {
		setSubmitting(true);
		const accessTypeFields = ACCESS_TYPE_FIELDS_MAPPING[values.accessType];
		const reqObj = Object.fromEntries(
			Object.entries(values).filter(([key]) =>
				accessTypeFields.includes(key as keyof MyFormValues)
			)
		);

		try {
			const res = await mockRequest();
			alert(`${res.data?.message}: ${JSON.stringify(reqObj, null, 2)}`);
		} catch (err: unknown) {
			console.error('Error in mockRequest:', err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<Formik
				initialValues={initialValues}
				validate={validateForm}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, handleSubmit, ...formikProps }) => {
					return (
						<form onSubmit={handleSubmit}>
							<div className={styles.section}>
								<h2>Request Access</h2>
							</div>
							<div className={styles.section}>
								<ImmediateSection {...formikProps} />
								<ScheduledSection {...formikProps} />
							</div>
							<div className={styles.section}>
								<AdditionalInfo {...formikProps} />
							</div>
							<FormActions
								isSubmitting={isSubmitting}
								onCancel={onCancel}
							/>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
