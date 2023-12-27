import { FormikProps } from 'formik';
import FormField from '../../../field/field';
import RadioInput from '../../../radio-input';
import { MyFormValues } from '../../types';
import { format } from 'date-fns';
import DatetimePicker from '../../../datetime-picker';

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
				<DatetimePicker
					name='startTime'
					min={currentDate}
					value={values.startTime}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</FormField>
			<FormField
				text='End time:'
				error={errors.endTime}
				touched={touched.endTime}
			>
				<DatetimePicker
					name='endTime'
					min={values.startTime || currentDate}
					value={values.endTime}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
			</FormField>
		</RadioInput>
	);
}
