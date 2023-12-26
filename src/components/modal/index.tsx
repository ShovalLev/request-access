import { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


interface Props {
	children: React.ReactNode;
}

export type CustomModalMethods = {
    close: () => void;
    open: () => void;
};

const CustomModal = forwardRef(
	({ children }: Props, ref: React.ForwardedRef<unknown>) => {
		useImperativeHandle(
			ref,
			() => {
				return {
					close: onCloseModal,
					open: onOpenModal,
				};
			},
			[]
		);

		const [open, setOpen] = useState(false);

		const onOpenModal = () => setOpen(true);
		const onCloseModal = () => setOpen(false);

		return (
			<Modal open={open} onClose={onCloseModal} center>
				{children}
			</Modal>
		);
	}
);

export default CustomModal;
