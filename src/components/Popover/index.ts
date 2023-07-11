import { Popover as PopoverPattern } from './Popover';

import { Trigger } from './Trigger';
import { Content } from './Content';

export { Trigger } from './Trigger';
export { Content } from './Content';

export const Popover = Object.assign(PopoverPattern, {
	Trigger: Trigger,
	Content: Content,
});

export default Popover;
