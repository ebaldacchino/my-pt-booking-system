import Header from './components/Header';
import { Body, Day, ButtonContainer, Frame } from './styles';
import DaysOfWeek from './components/DaysOfWeek';
import { isSameDay } from 'date-fns';
import Modal from '../../modal';
import { Button } from '../../../styles/button';

const Calendar = (props: {
	currentMonth: number;
	date: Date;
	dateObj: {
		year: number;
		day: number;
		month: number;
	};
	getDaysInMonth: Function;
	lastDay: Date;
	schedule: [];
	setDate: Function;
	startDay: number;
	today: Date;
	toggleCalendar: () => void;
	viewCalendar: false | Date;
	setViewCalendar: Function;
}) => {
	const {
		currentMonth,
		date,
		dateObj,
		getDaysInMonth,
		lastDay,
		schedule,
		setDate,
		startDay,
		today,
		toggleCalendar,
		viewCalendar,
		setViewCalendar,
	} = props;
	const { day, month, year } = dateObj;
	if (viewCalendar instanceof Date) {
		return (
			<Modal toggleModal={toggleCalendar}>
				<Frame>
					<Header
						{...{
							dateObj,
							today,
							viewCalendar,
							setViewCalendar,
						}}
					/>
					<Body>
						<DaysOfWeek />
						{Array(42)
							.fill(null)
							.map((_, index) => {
								const d = index - (startDay - 2);
								const thisDate = new Date(year, month, d);
								const thisDatesMonth = thisDate.getMonth();
								const daysInMonth = getDaysInMonth(year, month);
								const hasAvailableSessions = schedule.find(({ date }) =>
									isSameDay(date, thisDate)
								);
								return (
									<Day
										key={index}
										isToday={
											d === today.getDate() && currentMonth === thisDatesMonth
										}
										isSelected={d === day && currentMonth === month}
										isSameSelected={d === day && currentMonth !== month}
										isMuted={d <= 0 || d > daysInMonth + 1}
										disabled={!hasAvailableSessions}
										onClick={() => {
											setDate(thisDate);
											toggleCalendar();
										}}>
										{d > daysInMonth + 1
											? d - daysInMonth - 1
											: d > 0
											? d
											: getDaysInMonth(year, month - 1) + d + 1}
									</Day>
								);
							})}
					</Body>
					<ButtonContainer>
						<Button textOnly onClick={toggleCalendar}>
							Cancel
						</Button>
					</ButtonContainer>
				</Frame>
			</Modal>
		);
	}
	return <></>;
};

export default Calendar;
