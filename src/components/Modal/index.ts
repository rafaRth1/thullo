import { Modal as ModalPattern } from './Modal';

import { Content } from './Content';
import { Trigger } from './Trigger';

export { Trigger } from './Trigger';
export { Content } from './Content';

export const Modal = Object.assign(ModalPattern, {
	Trigger: Trigger,
	Content: Content,
});

export default Modal;
