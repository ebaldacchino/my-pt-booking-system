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
import { Button, Variant } from '../../../styles/button';
import schedule from '../../../components/book/mockDates';
import type { GetServerSideProps } from 'next';
import React from 'react';
import { format, addMinutes, addHours } from 'date-fns';
import fetcher from '../../../lib/fetcher';
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { props, redirect } = await authUserServerSideProps(context);
	if (redirect) return { redirect, props: {} };
	return { props: { givenName: props?.givenName || null, schedule } };
};

const TimeSection = tw.section`flex flex-col gap-2 bg-blue-600 text-white flex-1 w-full p-4`;
const Input = tw.input`text-black rounded text-center ml-auto my-auto`;
const Div = tw.div`w-full flex`;

interface Props {
	givenName: string;
	schedule: string;
}
export default function Book(props: Props) {
	const [startTime, setStartTime] = React.useState('12:00');
	const [sessionLength, setSessionLength] = React.useState(60);
	const [sessionsPerShift, setSessionsPerShift] = React.useState(1);
	const calendar = useCalendar();
	const [hr, min] = startTime.split(':');
	const p = calendar.date;
	const date = new Date(
		p.getFullYear(),
		p.getMonth(),
		p.getDate(),
		Number(hr),
		Number(min)
	);
	const formattedStartDate = format(date, 'do MMMM yy, hh:mm a');
	const formattedEndDate = format(
		addMinutes(date, sessionLength * sessionsPerShift),
		'do MMMM yy, hh:mm a'
	);
	const createShifts = async () => {
		const shifts: {
			date: Date;
			sessions: { time: Date; sessionLength: number; clientId: null }[];
		} = {
			date,
			sessions: [],
		};
		for (let i = 0; i < sessionsPerShift; i++) {
			shifts.sessions.push({
				time: addHours(date, i),
				sessionLength,
				clientId: null,
			});
		}
		try {
			const { res, data } = await fetcher('/api/shifts', shifts);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Layout
			user={props.givenName}
			title='Book here'
			description='Number One Personal Training services'>
			<DateSection {...calendar} />
			<TimeSection>
				<Div>Shift begins: {formattedStartDate}</Div>
				<Div>Shift ends: {formattedEndDate}</Div>
				<Div>
					Shift Start Time:
					<Input
						type='time'
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
					/>
				</Div>
				<Div>
					Session length (minutes):
					<Input
						type='number'
						value={sessionLength}
						min={1}
						onChange={(e) => setSessionLength(Number(e.target.value))}
					/>
				</Div>
				<Div>
					Number of sessions per shift:
					<Input
						type='number'
						value={sessionsPerShift}
						min={1}
						onChange={(e) => setSessionsPerShift(Number(e.target.value))}
					/>
				</Div>
				<Button variant={Variant.secondary} onClick={createShifts}>
					Create Shift
				</Button>
				{/* select the days */}
				{/* to have this shift on */}
				{/* select how many weeks to make this shift */}
				{/* reoccuring */}
				{/* infinitely occuring shift */}
			</TimeSection>
			<Calendar {...calendar} />
		</Layout>
	);
}
