import React from 'react';
import styles from './style.module.css';

interface Props {
	text: string;
	children: React.ReactNode;
	required?: boolean;
	error?: string;
	touched?: boolean;
}

export default function Field({
	text,
	required,
	error,
	touched,
	children,
}: Props) {
	return (
		<div className={styles.container}>
			<span>
				{text}
				{required && <span className={styles.required}>*</span>}
			</span>
			{children}
			<div className={styles.placeholder}>{error && touched && <span className={styles.error}>{error}</span>}</div>
		</div>
	);
}
