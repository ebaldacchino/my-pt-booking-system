import { authUserServerSideProps } from '../lib/auth';
// import { Title } from '../styles';
import Layout from '../components/Layout';
import tw from 'twin.macro';
import useCalendar from '../components/Calendar/useCalendar';
import Calendar from '../components/Calendar';
import DateSection from '../components/book/DateSection';
import { Button, Variant } from '../styles/button';
import type { GetServerSideProps } from 'next';
import shifts from '../lib/shifts';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { props, redirect } = await authUserServerSideProps(context);
	if (redirect) return { redirect, props: {} };
	const schedule = await shifts.getShifts();
	return {
		props: {
			givenName: props?.givenName || null,
			schedule: JSON.stringify(schedule) || null,
		},
	};
};

const TimeSection = tw.section`bg-blue-600 text-white flex-1 w-full`;
const TimeContainer = tw.div`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-auto px-4 p-4`;
const SlotContainer = tw.div`bg-blue-500 border-[3px] rounded-lg border-blue-200 flex flex-wrap gap-4 w-full justify-between items-center p-4`;
const Time = tw.span`m-auto`;
const BookButton = tw(Button)`m-auto`;

const Slot = ({
	time,
	sessionLength,
}: {
	time: Date;
	sessionLength: number;
	key: number;
}) => {
	const date = new Date(time);
	const startOfSession = format(date, 'h:mm a');
	const endOfSession = format(addMinutes(date, sessionLength), 'h:mm a');
	return (
		<SlotContainer>
			<Time>
				{startOfSession} - {endOfSession}
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
	const calendar = useCalendar({ schedule: props.schedule });
	return (
		<Layout
			user={props.givenName}
			title='Book here'
			description='Number One Personal Training services'>
			<DateSection {...calendar} />
			<TimeSection>
				<TimeContainer>
					{calendar.slots.map((slot, index: number) => {
						const { time, sessionLength } = slot;
						return <Slot key={index} {...{ time, sessionLength }} />;
					})}
				</TimeContainer>
			</TimeSection>
			<Calendar {...calendar} />
		</Layout>
	);
}
