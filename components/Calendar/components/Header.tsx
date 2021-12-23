import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { IconButton, Header } from '../styles';
import { isAfter, isBefore, format, addMonths, subMonths } from 'date-fns';
import type { HeaderProps } from '../types';

const CalendarHeader = (props: HeaderProps) => {
	const {
		dateObj: { year, month },
		today,
		viewCalendar,
		setViewCalendar,
		lastDay,
	} = props; 
	const disabledPrevArrow: boolean = isBefore(new Date(year, month, 0), today);
	const disabledNextArrow: boolean = lastDay
		? isAfter(viewCalendar, lastDay)
		: isAfter(new Date(year, month - 2, 0), today);
	return (
		<Header>
			<IconButton
				onClick={() => setViewCalendar(subMonths(viewCalendar, 1))}
				disabled={disabledPrevArrow}>
				<FaCaretLeft />
			</IconButton>
			<div>{format(viewCalendar, 'MMM y')}</div>
			<IconButton
				onClick={() => setViewCalendar(addMonths(viewCalendar, 1))}
				disabled={disabledNextArrow}>
				<FaCaretRight />
			</IconButton>
		</Header>
	);
};

export default CalendarHeader;
