import { KeyboardEvent, useMemo } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { format } from 'date-fns';
import { validateForm } from './validations';
import { AccessTypeFieldsMappingType, MyFormValues } from './types';
import styles from './styles.module.css';
import RadioInput from '../radio-input';
import Timeframe from '../timeframe';
import FormField from '../field/field';
import { mockRequest } from '../../mock-request';
import { TimingTypes } from '../timeframe/types';
import FormActions from './components/form-actions';

export const ACCESS_TYPE_FIELDS_MAPPING: AccessTypeFieldsMappingType = {
	['immediate']: ['timeframeAmount', 'timeframeType', 'reason'],
	['scheduled']: ['startTime', 'endTime', 'reason'],
};

interface Props {
	onCancel: () => void;
}

export default function RequestAccessForm({ onCancel }: Props) {
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

	const currentDate = useMemo(() => {
		const currentDate = new Date();
		return format(currentDate, "yyyy-MM-dd'T'HH:mm");
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
			<div className={styles.section}>
				<h2>Request Access</h2>
			</div>
			<Formik
				initialValues={initialValues}
				validate={validateForm}
				onSubmit={handleSubmit}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						<div className={styles.section}>
							<RadioInput
								text='Immediate access'
								type='radio'
								name='accessType'
								value='immediate'
								description='Get immidiate access for the selected timeframe from the moment your request is approved.'
								checked={values.accessType === 'immediate'}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<FormField
									text='Timeframe'
									error={
										errors.timeframeAmount ||
										errors.timeframeType
									}
									touched={
										touched.timeframeAmount ||
										touched.timeframeType
									}
								>
									<Timeframe
										amountFieldData={{
											fieldName: 'timeframeAmount',
											value: values.timeframeAmount,
										}}
										typeFieldData={{
											fieldName: 'timeframeType',
											value: values.timeframeType,
										}}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</FormField>
							</RadioInput>
							<RadioInput
								text='Scheduled time slot'
								type='radio'
								name='accessType'
								value='scheduled'
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<FormField
									text='Start time:'
									error={errors.startTime}
									touched={touched.startTime}
								>
									<input
										className={styles.datepicker}
										type='datetime-local'
										name='startTime'
										onKeyDown={(
											e: KeyboardEvent<HTMLInputElement>
										) => e.preventDefault()}
										min={currentDate}
										value={values.startTime}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</FormField>
								<FormField
									text='End time:'
									error={errors.endTime}
									touched={touched.endTime}
								>
									<input
										className={styles.datepicker}
										type='datetime-local'
										name='endTime'
										onKeyDown={(
											e: KeyboardEvent<HTMLInputElement>
										) => e.preventDefault()}
										min={currentDate}
										value={values.endTime}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</FormField>
							</RadioInput>
						</div>
						<div className={styles.section}>
							<FormField
								text='Reason'
								error={errors.reason}
								touched={touched.reason}
								required
							>
								<textarea
									id='reason'
									name='reason'
									value={values.reason}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</FormField>
						</div>
						<FormActions
							isSubmitting={isSubmitting}
							onCancel={onCancel}
						/>
					</form>
				)}
			</Formik>
		</div>
	);
}
