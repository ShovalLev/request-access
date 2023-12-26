import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import FormField from '../../../field/field';
import { MyFormValues } from '../../types';

interface Props {
	values: MyFormValues;
	errors: FormikErrors<MyFormValues>;
	touched: FormikTouched<MyFormValues>;
	handleChange: (e: React.FocusEvent<any, Element>) => void;
	handleBlur: (e: React.FocusEvent<any, Element>) => void;
}

export default function AdditionalInfo({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
}: Props) {
	return (
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
	);
}
