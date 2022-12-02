import interact from 'interactjs';

interact('.draggable').draggable({
	inertia: true,
	modifiers: [
		interact.modifiers.restrictRect({
			restriction: 'parent',
			endOnly: true,
		}),
	],
	autoScroll: true,
	listeners: {
		move: dragMoveListener,
		// end(event) {
		// 	var textEl = event.target.querySelector('p');
		// 	textEl &&
		// 		(textEl.textContent =
		// 			'moved a distance of ' +
		// 			Math.sqrt(
		// 				(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2)) | 0
		// 			).toFixed(2) +
		// 			'px');
		// },
	},
});

function dragMoveListener(event: any) {
	var target = event.target;
	var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
	var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

// this function is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener;
