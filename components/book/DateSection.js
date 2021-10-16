import { useState, useRef, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { BiCalendarAlt } from 'react-icons/bi';
import { ListContainer, ListItem, ListItemButton } from '../list-group';
import {
	format,
	addDays,
	isSameDay,
	differenceInCalendarDays,
	addMonths,
} from 'date-fns';

const DateSectionContainer = tw(ListContainer)`w-full flex`;
const DatesList = styled(ListContainer)`
	${tw`flex-1 flex overflow-hidden border-none`}
	${(props) =>
		props.active ? tw`cursor-grabbing transform  scale-50` : tw`cursor-pointer`}
`;

const DateListItem = tw(
	ListItem
)`min-w-1/3 sm:min-w-1/5 md:min-w-1/7 lg:min-w-1/11`;
const CalendarButton = tw(ListItemButton)`w-1/4 sm:w-1/6 md:w-1/8 lg:w-1/12`;

const DateSection = (props) => {
	const {
		currentMonth,
		date,
		dateObj,
		getDaysInMonth,
		setDate,
		setViewCalendar,
		startDay,
		today,
		toggleCalendar,
		viewCalendar,
	} = props;
	const [isDown, setIsDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [startScrollLeft, setStartScrollLeft] = useState(0);
	const sliderEl = useRef(null);

	const handleMouseLeave = () => {
		setIsDown(false);
	};
	const handleMouseUp = (e) => {
		setIsDown(false);
		console.log(e);
	};
	const handleMouseDown = (e) => {
		setIsDown(true);
		setStartX(e.pageX);
		setStartScrollLeft(sliderEl.current.scrollLeft);
	};
	const handleMouseMove = (e) => {
		if (!isDown) return;
		e.preventDefault();
		const walk = e.pageX - startX;
		sliderEl.current.scrollLeft = startScrollLeft - walk;
	};
	useEffect(() => {
		const daysFromToday = differenceInCalendarDays(date, today);
		const dateButtonWidth =
			sliderEl.current.children[0].getBoundingClientRect().width;
		// sliderEl.current.scrollLeft = dateButtonWidth * daysFromToday;
		sliderEl.current.scrollTo({
			left: dateButtonWidth * daysFromToday,
			behavior: 'smooth',
		});
	}, [date]);
	return (
		<DateSectionContainer>
			<DatesList
				ref={sliderEl}
				active={isDown ? 'true' : ''}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}>
				{new Array(differenceInCalendarDays(addMonths(today, 3), today) + 1)
					.fill('')
					.map((_, index) => {
						const thisDate = addDays(new Date(), index);
						return (
							<DateListItem key={index}>
								<ListItemButton
									blue={isSameDay(thisDate, date)}
									onClick={(e) => {
										const walk = e.pageX - startX;
										if (walk) return;
										setDate(thisDate);
									}}>
									{format(thisDate, 'd MMM')}
								</ListItemButton>
							</DateListItem>
						);
					})}
			</DatesList>
			<CalendarButton dontFill icon onClick={toggleCalendar}>
				<BiCalendarAlt />
			</CalendarButton>
		</DateSectionContainer>
	);
};

export default DateSection;
