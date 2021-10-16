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

const TimeSection = tw.section` w-full mb-auto flex flex-row flex-wrap`;
const SlotContainer = tw.div`flex w-full sm:w-1/2 lg:w-1/3 justify-between items-center p-4`;
const Time = tw.span``;

const Slot = () => (
	<SlotContainer>
		<Time>10:00-11:00am</Time>
		<Button secondary>Book Today</Button>
	</SlotContainer>
);

export default function Book(props) {
	const calendarData = useCalendar();
	const { viewCalendar } = calendarData;
	return (
		<Layout user={props.givenName}>
			<DateSection {...calendarData} />
			<TimeSection>
				{new Array(5).fill('').map((_, index) => (
					<Slot key={index} />
				))}
			</TimeSection>
			{viewCalendar && <Calendar {...calendarData} />}
		</Layout>
	);
}
