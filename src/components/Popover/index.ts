import PopoverPattern from './Popover';

import Trigger from './Trigger';
import Body from './Body';
import PopoverContent from './PopoverContent';

const Popover = Object.assign(PopoverPattern, {
	Trigger: Trigger,
	Body: Body,
	PopoverContent: PopoverContent,
});

export { Popover, Trigger, Body, PopoverContent };
