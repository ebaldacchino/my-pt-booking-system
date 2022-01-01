import { useState, useRef, useEffect } from 'react';
import type { PointerEvent } from 'react';
import tw, { styled } from 'twin.macro';
import { BiCalendarAlt } from 'react-icons/bi';
import { ListContainer, ListItem, ListItemButton } from '../list-group';
import { format, addDays, isSameDay, differenceInCalendarDays, subDays } from 'date-fns';
import { Session } from '../Calendar/types';

// import scheduleData from './mockDates';

const DateSectionContainer = tw(ListContainer)`w-full flex`;
const DatesList = styled(ListContainer)`
	touch-action: none;
	${tw`flex-1 flex overflow-hidden border-none`}
	${(props: { active: string }) =>
		props.active ? tw`cursor-[grabbing]` : tw`cursor-pointer`}
`;

const DateListItem = tw(
	ListItem
)`min-w-[33.33%] sm:min-w-[20%] md:min-w-[14.28%] lg:min-w-[9.09%] select-none`;
const CalendarButton = tw(
	ListItemButton
)`w-1/4 sm:w-1/6 md:w-[12.5%] lg:w-1/12`;

const DateSection = (props: any) => {
	const {
		// currentMonth,
		date,
		// dateObj,
		// getDaysInMonth,
		lastDay,
		schedule,
		setDate,
		// setViewCalendar,
		// startDay,
		today,
		toggleCalendar,
		// viewCalendar,
	} = props;
	const [isDown, setIsDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [startScrollLeft, setStartScrollLeft] = useState(0);
	const sliderEl = useRef<HTMLDivElement>(null);

	const daysBetweenLastDayAndToday = differenceInCalendarDays(
		lastDay,
		subDays(today, 1)
	) || 365;

	const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
		setIsDown(false);
	};
	const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
		setIsDown(false);
	};
	const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDown(true);
		setStartX(e.pageX);
		if (null !== sliderEl.current) {
			setStartScrollLeft(sliderEl.current.scrollLeft);
		}
	};
	const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
		if (!isDown) return;
		const walk = e.pageX - startX;
		if (null !== sliderEl.current) {
			sliderEl.current.scrollLeft = startScrollLeft - walk;
		}
	};
	useEffect(() => {
		const selectedDateFromToday = differenceInCalendarDays(date, today);
		if (null !== sliderEl.current) {
			const dateButtonWidth =
				sliderEl.current.children[0].getBoundingClientRect().width;
			// sliderEl.current.scrollLeft = dateButtonWidth * selectedDateFromToday;
			sliderEl.current.scrollTo({
				left: dateButtonWidth * selectedDateFromToday,
				behavior: 'smooth',
			});
		}
	}, [date, today]);
	return (
		<DateSectionContainer>
			<DatesList
				ref={sliderEl}
				active={isDown ? 'true' : ''}
				onPointerDown={handlePointerDown}
				onPointerLeave={handlePointerLeave}
				onPointerUp={handlePointerUp}
				onPointerMove={handlePointerMove}>
				{new Array(daysBetweenLastDayAndToday)
					// add days above
					.fill('')
					.map((_, index) => {
						const thisDate = addDays(new Date(), index);
						const hasAvailableSessions = schedule ? schedule.find(
							({ time }: Session) => isSameDay(time, thisDate)
						) : true;
						return (
							<DateListItem key={index}>
								<ListItemButton
									blue={isSameDay(thisDate, date)}
									disabled={!hasAvailableSessions}
									onClick={(e) => {
										e.preventDefault();
										const walk = e.pageX - startX;
										if (Math.abs(walk) > 1) return;
										setDate(thisDate);
									}}>
									{format(thisDate, 'd MMM')}
								</ListItemButton>
							</DateListItem>
						);
					})}
			</DatesList>
			<CalendarButton
				dontFill
				icon
				onClick={toggleCalendar}
				aria-label='Open calendar button'>
				<BiCalendarAlt />
			</CalendarButton>
		</DateSectionContainer>
	);
};

export default DateSection;
