import { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export type CustomModalMethods = {
	close: () => void;
	open: () => void;
};

interface Props {
	children: React.ReactNode;
}

const CustomModal = forwardRef(
	({ children }: Props, ref: React.ForwardedRef<CustomModalMethods>) => {
		useImperativeHandle(
			ref,
			() => {
				return {
					close: () => onToggleModal(false),
					open: () => onToggleModal(true),
				};
			},
			[]
		);

		const [open, setOpen] = useState<boolean>(false);
		const onToggleModal = (open: boolean) => {
			setOpen(open);
		};

		return (
			<Modal open={open} onClose={() => onToggleModal(false)} center>
				{children}
			</Modal>
		);
	}
);

export default CustomModal;
