import styles from './styles.module.css';

type Props = {
	isSubmitting?: boolean;
	onCancel: () => void;
};

export default function FormActions({ isSubmitting, onCancel }: Props) {
	return (
		<div className={styles.container}>
			<button className={styles.button} type='submit' disabled={isSubmitting}>
				Submit
			</button>
			<button className={styles.button} type='button' onClick={onCancel}>
				Cancel
			</button>
		</div>
	);
}
