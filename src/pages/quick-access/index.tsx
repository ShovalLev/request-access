import { useRef } from 'react';
import CustomModal, { CustomModalMethods } from '../../components/modal';
import RequestAccessForm from '../../components/request-access-form';
import styles from './styles.module.css';

export default function QuickAccess() {
	const modalRef = useRef<CustomModalMethods>(null);

	const openModal = () => {
		modalRef.current?.open();
	};

    const closeModal = () => {
        modalRef.current?.close();
    };

	return (
		<div>
			<button className={styles.button} onClick={openModal}>Open modal</button>
			<CustomModal ref={modalRef}>
				<RequestAccessForm onCancel={closeModal}/>
			</CustomModal>
		</div>
	);
}
