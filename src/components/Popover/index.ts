import { Popover as PopoverPattern } from './Popover';

import { Trigger } from './Trigger';
import { Body } from './Body';
import { PopoverContent } from './PopoverContent';

export { Trigger } from './Trigger';
export { Body } from './Body';
export { PopoverContent } from './PopoverContent';

export const Popover = Object.assign(PopoverPattern, {
	Trigger: Trigger,
	Body: Body,
	PopoverContent: PopoverContent,
});

export default Popover;
