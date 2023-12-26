import { KeyboardEvent } from 'react';
import { FormikProps } from 'formik';
import styles from './styles.module.css';
import FormField from '../../../field/field';
import RadioInput from '../../../radio-input';
import { MyFormValues } from '../../types';
import { format } from 'date-fns';

interface Props
	extends Pick<
		FormikProps<MyFormValues>,
		'values' | 'errors' | 'touched' | 'handleChange' | 'handleBlur'
	> {}

export default function ScheduledSection({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
}: Props) {
	const currentDate = format(Date.now(), "yyyy-MM-dd'T'HH:mm");

	return (
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
					onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
						e.preventDefault()
					}
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
					onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
						e.preventDefault()
					}
					min={currentDate}
					value={values.endTime}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</FormField>
		</RadioInput>
	);
}
