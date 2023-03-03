import { DetailedHTMLProps, HTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { IoAddOutline, IoAttach, IoChatboxSharp } from 'react-icons/io5';
import { useDrag } from '../hooks/useDrag';

interface Props {
	card: any;
	isDragging: boolean;
	handleDragging: (dragging: boolean) => void;
	handleEditCard: (card: any) => void;
}

export const Card = memo(({ card, isDragging, handleDragging, handleEditCard }: Props) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDrag, setIsDrag] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const moveDragging = useRef<boolean>(false);
	const coords = useRef<{
		startX: number;
		startY: number;
		lastY: number;
		lastX: number;
	}>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

	const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		event.dataTransfer.setData('text', `${card._id}`);
		handleDragging(true);
	};

	const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
		handleDragging(false);
	};

	const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
		setPosition({ x: event.clientX, y: event.clientY });
	};

	// useEffect(() => {
	// 	if (!cardRef.current || !containerRef.current) return;

	// 	const card = cardRef.current;
	// 	const container = containerRef.current;

	// 	const onMouseDown = (e: MouseEvent) => {
	// 		e.preventDefault();
	// 		moveDragging.current = true;
	// 		setIsDrag(true);

	// 		coords.current.startX = e.clientX;
	// 		coords.current.startY = e.clientY;
	// 	};

	// 	const onMouseUp = (e: MouseEvent) => {
	// 		e.preventDefault();
	// 		moveDragging.current = false;
	// 		setIsDrag(false);

	// 		coords.current.lastX = card.offsetLeft;
	// 		coords.current.lastY = card.offsetTop;
	// 	};

	// 	const onMouseMove = (e: MouseEvent) => {
	// 		e.preventDefault();
	// 		if (!moveDragging.current) return;

	// 		// card.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

	// 		const nextX = e.clientX - coords.current.startX + coords.current.lastX;
	// 		const nextY = e.clientY - coords.current.startY + coords.current.lastY;

	// 		card.style.top = `${nextY}px`;
	// 		card.style.left = `${nextX}px`;
	// 	};

	// 	card?.addEventListener('mousedown', onMouseDown);
	// 	card?.addEventListener('mouseup', onMouseUp);
	// 	container?.addEventListener('mousemove', onMouseMove);
	// 	container?.addEventListener('mouseleave', onMouseUp);

	// 	const cleanUp = () => {
	// 		card?.removeEventListener('mousedown', onMouseDown);
	// 		card?.removeEventListener('mouseup', onMouseUp);
	// 		container?.removeEventListener('mousemove', onMouseMove);
	// 		container?.removeEventListener('mouseleave', onMouseUp);
	// 	};

	// 	return cleanUp;
	// }, []);

	return (
		<div
			ref={containerRef}
			className={`card-container rounded-2xl mb-3 z-0 transition-colors relative touch-none select-none ${
				isDragging ? 'border-dashed border-blue-400 border-2 ' : ''
			}`}
			onClick={() => {
				// handleEditCard(card)
			}}>
			<div
				ref={cardRef}
				className={`card-content bg-neutral-800 p-2 shadow-xl rounded-2xl cursor-move transition-transform`}
				draggable
				onDrag={onDrag}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}>
				<div className='card-image'>
					{!!card.imgUlr ? (
						<img
							src={card.imgUlr}
							alt='Card Image'
							className='rounded-lg w-full object-cover mb-2'
							style={{ height: '130px' }}
						/>
					) : null}
				</div>

				<p className='name-card text-white'>{card.nameCard}</p>

				<div className='all-board inline-flex bg-green-300 items-center rounded-lg py-1 px-3 mt-1 text-xs cursor-pointer h-6'>
					<span className='text-green-900'>Concept</span>
				</div>

				{card.labels.map((label: any, index: number) => (
					<div
						key={index}
						className={`all-board inline-flex items-center rounded-lg py-1 px-3 mt-1 mx-2 text-xs cursor-pointer h-6`}
						style={{ background: label.palet.color_light }}>
						<span style={{ color: label.palet.color }}>{label.nameLabel}</span>
					</div>
				))}

				<div className='footer-card flex items-center justify-between mt-3'>
					<div className='users-access'>
						<div className='user-image-add'>
							<span className='bg-blue-500 w-9 h-9 object-cover rounded-md text-3xl inline-flex items-center justify-center cursor-pointer'>
								<IoAddOutline
									color='white'
									size={20}
								/>
							</span>
						</div>
					</div>

					<div className='archives flex'>
						<div className='attachments flex items-center mr-4'>
							<IoAttach className='text-neutral-500' />
							<span className='text-xs text-neutral-500 p-1'>{card.attachments.length}</span>
						</div>

						<div className='comments flex items-center'>
							<IoChatboxSharp className='text-neutral-400' />
							<span className='text-xs text-neutral-500 p-1'>{card.comments.length}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
