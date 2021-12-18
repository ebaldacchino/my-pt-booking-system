import { authUserServerSideProps } from '../lib/auth';
// import { Title } from '../styles';
import Layout from '../components/Layout';
import tw from 'twin.macro';
import useCalendar from '../components/book/Calendar/useCalendar';
import Calendar from '../components/book/Calendar';
import DateSection from '../components/book/DateSection';
import { Button, Variant } from '../styles/button';
import schedule from '../components/book/mockDates';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { props, redirect } = await authUserServerSideProps(context);
	if (redirect) return { redirect, props: {} };
	return { props: { givenName: props?.givenName || null, schedule } };
};

const TimeSection = tw.section`bg-blue-600 text-white flex-1 w-full`;
const TimeContainer = tw.div`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-auto px-4 p-4`;
const SlotContainer = tw.div`bg-blue-500 border-[3px] rounded-lg border-blue-200 flex flex-wrap gap-4 w-full justify-between items-center p-4`;
const Time = tw.span`m-auto`;
const BookButton = tw(Button)`m-auto`;

const Slot = ({ time }: { time: number }) => {
	const hr = Math.floor((time - (time >= 1300 ? 1200 : 0)) / 100);
	const endHr = hr === 12 ? 1 : hr + 1;
	const min = time % 100;
	const formattedMin = min < 10 ? `0${min}` : min;
	return (
		<SlotContainer>
			<Time>
				{hr}:{formattedMin} - {endHr}:{formattedMin}{' '}
				{time < 1100 || time >= 2300 ? 'AM' : 'PM'}
			</Time>
			<BookButton variant={Variant.secondary}>Book Today</BookButton>
		</SlotContainer>
	);
};

interface Props {
	givenName: string;
	schedule: string;
}

export default function Book(props: Props) {
	const calendarData = useCalendar({ schedule: props.schedule });
	return (
		<Layout
			user={props.givenName}
			title='Book here'
			description='Number One Personal Training services'>
			<DateSection {...calendarData} />
			<TimeSection>
				<TimeContainer>
					{calendarData.slots.map(
						({ time }: { time: string }, index: number) => {
							return <Slot key={index} time={Number(time)} />;
						}
					)}
				</TimeContainer>
			</TimeSection>
			<Calendar {...calendarData} />
		</Layout>
	);
}
