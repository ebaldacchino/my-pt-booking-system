
import { DayOfWeek, DaysOfWeekContainer } from '../styles';
const DAYS_OF_THE_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DaysOfWeek = () => {
	return (
		<DaysOfWeekContainer>
			{DAYS_OF_THE_WEEK.map((d) => (
				<DayOfWeek key={d}>
					{d}
				</DayOfWeek>
			))}
		</DaysOfWeekContainer>
	);
};

export default DaysOfWeek;