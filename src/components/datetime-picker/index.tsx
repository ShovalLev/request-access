import { KeyboardEvent } from 'react';
import styles from './styles.module.css';
import { FormikProps } from 'formik';

interface Props
	extends Pick<FormikProps<unknown>, 'handleChange' | 'handleBlur'>,
		React.InputHTMLAttributes<HTMLInputElement> {}

export default function DatetimePicker({
	name,
	value,
	min,
	handleChange,
	handleBlur,
}: Props) {
	return (
		<input
			className={styles.datepicker}
			type='datetime-local'
			name={name}
			onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
				e.preventDefault()
			}
			min={min}
			value={value}
			form='novalidatedform'
			onChange={handleChange}
			onBlur={handleBlur}
		/>
	);
}
