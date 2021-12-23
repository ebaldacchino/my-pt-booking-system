import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { IconButton, Header } from '../styles';
import { isBefore, format, addMonths, subMonths } from 'date-fns';
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
	const disabledNextArrow: boolean = !isBefore(
		new Date(year, month + 1, -1),
		lastDay
	);
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
