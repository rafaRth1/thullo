export type Position = 'bottom-center' | 'left' | 'right' | 'top-center' | 'static';
export type Rect = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>;

export interface PopoverContextProps {
	isShow: boolean;
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
	triggerRect: Rect;
	setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>;
	preferredPosition: Position;
}
