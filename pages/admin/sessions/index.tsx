// create a shift
// length of shift
// length of slots
// select the days to have this shift on
// select
// how many weeks to make this shift reoccuring
// infinitely occuring shift
// for each shift
// create empty slots
// attach shift start datetime
// push slots to database
// get slots
// group each slot by shift start datetime
// use new Set to get all start datetimes
// for each start datetime
// find all the shifts with same start datetime

import { authUserServerSideProps } from '../../../lib/auth';
// import { Title } from '../styles';
import Layout from '../../../components/Layout';
import tw from 'twin.macro';
import useCalendar from '../../../components/Calendar/useCalendar';
import Calendar from '../../../components/Calendar';
import DateSection from '../../../components/book/DateSection';
import type { GetServerSideProps } from 'next';
import AvailableSession from '../../../components/book/AvailableSession';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { props, redirect } = await authUserServerSideProps(context);
	if (redirect) return { redirect, props: {} };
	return { props: { givenName: props?.givenName || null, schedule: null } };
};

const TimeSection = tw.section`bg-blue-600 text-white flex-1 w-full`;
const TimeContainer = tw.div`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-auto px-4 p-4`;

interface Props {
	givenName: string;
	schedule: string;
}

export default function Book(props: Props) {
	const calendar = useCalendar({ schedule: props.schedule });
	return (
		<Layout
			user={props.givenName}
			title='Check bookings'
			description='Number One Personal Training services'>
			<DateSection {...calendar} />
			<TimeSection>
				<TimeContainer>
					{calendar.slots.map((slot, index: number) => {
						const { time, sessionLength } = slot;
						return (
							<AvailableSession key={index} {...{ time, sessionLength }} />
						);
					})}
				</TimeContainer>
			</TimeSection>
			<Calendar {...calendar} />
		</Layout>
	);
}
