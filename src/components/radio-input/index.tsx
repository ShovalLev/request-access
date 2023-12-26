import React from 'react';
import styles from './styles.module.css';

interface CustomRadioInputType
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	text: string;
	description?: string;
}

export default function CustomRadioInput({
	name,
	value,
	text,
	description,
	children,
	checked,
	onChange,
	onBlur,
}: CustomRadioInputType) {
	return (
		<section className={styles.container}>
			<label className={styles.radio}>
				<input
					type='radio'
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					onBlur={onBlur}
				/>
				{text}
			</label>
			{description && (
				<label className={styles.description}>{description}</label>
			)}
			{children}
		</section>
	);
}
