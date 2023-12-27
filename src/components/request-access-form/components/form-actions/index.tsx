import { FormikProps } from 'formik';
import styles from './styles.module.css';
import { MyFormValues } from '../../types';
import { RequestAccessFormProps } from '../..';

interface Props
	extends Pick<FormikProps<MyFormValues>, 'isSubmitting'>,
		Pick<RequestAccessFormProps, 'onCancel'> {}

export default function FormActions({ isSubmitting, onCancel }: Props) {
	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				type='submit'
				disabled={isSubmitting}
			>
				Request
			</button>
			<button className={styles.button} type='button' onClick={onCancel}>
				Cancel
			</button>
		</div>
	);
}
