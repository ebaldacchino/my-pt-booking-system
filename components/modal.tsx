import { MouseEvent } from 'react';
import tw, { styled } from 'twin.macro';

const ModalBackground = styled.div`
	${tw`absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 z-10 flex justify-center`}
	${({ end }: any) => (end ? tw`items-end` : tw`items-center`)}
`;
const Frame = styled.div`
	${tw`bg-white rounded p-5 w-11/12 sm:w-2/3 flex flex-col`}
	${({ row }: any) => !row && tw`flex-col`}
`;

interface ModalProps {
	children: any;
	frame?: true | undefined;
	toggleModal: () => void;
	end?: true | undefined;
	row?: true | undefined;
}

const Modal = ({ children, frame, toggleModal, end, row }: ModalProps) => {
	const handleClosingModal = (
		e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
	) => {
		const { className } = e.target as Element;
		if (typeof className === 'string' && className.includes('modal-bg')) {
			toggleModal();
		}
	};
	return (
		<ModalBackground
			onClick={(e) => handleClosingModal(e)}
			className='modal-bg'
			{...{ end }}>
			{frame ? <Frame {...{ row }}>{children}</Frame> : children}
		</ModalBackground>
	);
};
export default Modal;
export { Frame };
