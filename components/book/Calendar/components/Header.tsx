import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { IconButton, Header } from '../styles';
import { isAfter, isBefore, format, addMonths, subMonths } from 'date-fns';

const CalendarHeader = (props: {
	// date: Date;
	dateObj: {
		year: number;
		month: number;
		day: number;
	};
	today: Date;
	viewCalendar: Date;
	setViewCalendar: Function;
}) => {
	const {
		dateObj: { year, month },
		today,
		viewCalendar,
		setViewCalendar,
	} = props;
	const disabledPrevArrow: boolean = isBefore(new Date(year, month, 0), today);
	const disabledNextArrow: boolean = isAfter(
		new Date(year, month - 2, 0),
		today
	);
	console.log(props);
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
