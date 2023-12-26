import { FormikProps } from 'formik';
import FormField from '../../../field/field';
import RadioInput from '../../../radio-input';
import Timeframe from '../../../timeframe';
import { MyFormValues } from '../../types';

interface Props
	extends Pick<
		FormikProps<MyFormValues>,
		'values' | 'errors' | 'touched' | 'handleChange' | 'handleBlur'
	> {}

export default function ImmediateSection({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
}: Props) {
	return (
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
				error={errors.timeframeAmount || errors.timeframeType}
				touched={touched.timeframeAmount || touched.timeframeType}
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
	);
}
