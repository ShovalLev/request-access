import React from 'react';
import { TimingTypes } from './types';
import styles from './styles.module.css';

interface Props extends React.HTMLAttributes<HTMLElement> {
	amountFieldData: { fieldName: string; value?: number };
	typeFieldData: { fieldName: string; value?: TimingTypes };
}

export default function Timeframe({
	amountFieldData,
	typeFieldData,
	onChange,
	onBlur,
}: Props) {
	return (
		<div className={styles.container}>
			<input
				className={styles.amount}
				type='number'
				name={amountFieldData.fieldName}
				value={amountFieldData.value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			<select
				name={typeFieldData.fieldName}
				value={typeFieldData.value}
				onChange={onChange}
				onBlur={onBlur}
			>
				{Object.values(TimingTypes).map((timingType) => (
					<option key={timingType} value={timingType}>
						{timingType}
					</option>
				))}
			</select>
		</div>
	);
}
