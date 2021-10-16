import Header from './components/Header';
import { Body, Day, ButtonContainer, Frame } from './styles';
import DaysOfWeek from './components/DaysOfWeek';
import { isBefore, isAfter, addMonths, addDays } from 'date-fns';
import Modal from '../../modal';
import { Button } from '../../button';
const Calendar = (props) => {
	const {
		currentMonth,
		date,
		dateObj,
		getDaysInMonth,
		setDate,
		startDay,
		today,
		toggleCalendar,
		viewCalendar,
		setViewCalendar,
	} = props;
	const { day, month, year } = dateObj;
	return (
		<Modal toggleModal={toggleCalendar}>
			<Frame>
				<Header
					{...{
						date,
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
							return (
								<Day
									key={index}
									isToday={
										d === today.getDate() && currentMonth === thisDatesMonth
									}
									isSelected={d === day && currentMonth === month}
									isSameSelected={d === day && currentMonth !== month}
									isMuted={d <= 0 || d > daysInMonth + 1}
									disabled={
										isBefore(addDays(thisDate, 1), today) ||
										isAfter(thisDate, addMonths(today, 3))
									}
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
};

export default Calendar;
