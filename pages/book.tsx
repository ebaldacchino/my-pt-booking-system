import { authUserServerSideProps } from '../lib/auth';
// import { Title } from '../styles';
import Layout from '../components/Layout';
import tw from 'twin.macro';
import useCalendar from '../components/book/Calendar/useCalendar';
import Calendar from '../components/book/Calendar';
import DateSection from '../components/book/DateSection';
import { Button } from '../components/button';

export const getServerSideProps = async (context) =>
	await authUserServerSideProps(context);

const TimeSection = tw.section`bg-blue-600 text-white flex-1 w-full`;
const TimeContainer = tw.div`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-auto px-4 p-4`;
const SlotContainer = tw.div`bg-blue-500 border-3 rounded-lg border-blue-200 flex flex-wrap gap-4 w-full justify-between items-center p-4`;
const Time = tw.span`m-auto`;
const BookButton = tw(Button)`m-auto`;

const Slot = ({ time }) => {
	const hr = Math.floor(time >= 13 ? time - 12 : time);
	const endHr = hr === 12 ? 1 : hr + 1
	const min = (time % 1) * 60;
	const formattedMin = min < 10 ? `0${min}` : min;
	return (
		<SlotContainer>
			<Time>
				{hr}:{formattedMin} - {endHr}:{formattedMin} {time < 11 || time >= 23 ? 'AM' : 'PM'}
			</Time>
			<BookButton secondary>Book Today</BookButton>
		</SlotContainer>
	);
};

export default function Book(props) {
	const calendarData = useCalendar();
	const { viewCalendar } = calendarData;
	return (
		<Layout user={props.givenName}>
			<DateSection {...calendarData} />
			<TimeSection>
				<TimeContainer>
					<Slot time={9.75} />
					<Slot time={10.5} />
					<Slot time={12} />
					<Slot time={13} />
					<Slot time={16.5} />
				</TimeContainer>
			</TimeSection>
			{viewCalendar && <Calendar {...calendarData} />}
		</Layout>
	);
}
