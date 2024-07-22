import PopoverPattern from './popover-custom';

import Trigger from './trigger';
import Body from './body';
import PopoverContent from './popover-content';

import './popover-custom.css';

const PopoverCustom = Object.assign(PopoverPattern, {
	Trigger: Trigger,
	Body: Body,
	PopoverContent: PopoverContent,
});

export { PopoverCustom, Trigger, Body, PopoverContent };
