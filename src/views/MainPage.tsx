import { useState } from 'react';
import interact from 'interactjs';
import { AddElementLabel } from '../components/AddElementLabel';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { handleShowModal } from '../store';
import { ListCard } from '../components/ListCard/ListCard';

export const MainPage = () => {
	// interact('.dropzone').dropzone({
	// 	// only accept elements matching this CSS selector
	// 	accept: '#yes-drop',
	// 	// Require a 75% element overlap for a drop to be possible
	// 	overlap: 'center',

	// 	// listen for drop related events:

	// 	ondropactivate: function (event) {
	// 		// add active dropzone feedback
	// 		event.target.classList.add('drop-active');
	// 	},
	// 	ondragenter: function (event) {
	// 		var draggableElement = event.relatedTarget;
	// 		var dropzoneElement = event.target;

	// 		// feedback the possibility of a drop
	// 		dropzoneElement.classList.add('drop-target');
	// 		draggableElement.classList.add('can-drop');
	// 		draggableElement.textContent = 'Dragged in';
	// 	},
	// 	ondragleave: function (event) {
	// 		// remove the drop feedback style
	// 		event.target.classList.remove('drop-target');
	// 		event.relatedTarget.classList.remove('can-drop');
	// 		event.relatedTarget.textContent = 'Dragged out';
	// 	},
	// 	ondrop: function (event) {
	// 		event.relatedTarget.textContent = 'Dropped Dentro';
	// 	},
	// 	ondropdeactivate: function (event) {
	// 		// remove active dropzone feedback
	// 		event.target.classList.remove('drop-active');
	// 		event.target.classList.remove('drop-target');
	// 	},
	// });

	// interact('.drag-drop').draggable({
	// 	inertia: true,
	// 	modifiers: [
	// 		interact.modifiers.restrictRect({
	// 			restriction: 'parent',
	// 			endOnly: true,
	// 		}),
	// 	],
	// 	// autoScroll: true,
	// 	// dragMoveListener from the dragging demo above
	// 	listeners: { move: dragMoveListener },
	// });

	// function dragMoveListener(event: any) {
	// 	var target = event.target;
	// 	// keep the dragged position in the data-x/data-y attributes
	// 	var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
	// 	var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	// 	// translate the element
	// 	target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

	// 	// update the posiion attributes
	// 	target.setAttribute('data-x', x);
	// 	target.setAttribute('data-y', y);
	// }

	const { lists } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	return (
		<main className='contenedor'>
			<div className='main-content flex'>
				{lists.map((list) => (
					<ListCard
						key={list.id}
						list={list}
					/>
				))}

				<div className='contenedor-list'>
					<AddElementLabel
						text='Add Another List'
						handleDispatch={() => dispatch(handleShowModal(true))}
					/>
				</div>
			</div>
		</main>
	);
};

{
	/* <div
				id='no-drop'
				className='drag-drop'>
				#no-drop
			</div>

			<div
				id='yes-drop'
				className='drag-drop'>
				#yes-drop
			</div>

			<div
				id='outer-dropzone'
				className='dropzone'>
				#outer-dropzone
				<div
					id='inner-dropzone'
					className='dropzone'>
					#inner-dropzone
				</div>
			</div> */
}
