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
import { format, addMinutes, addWeeks, addDays } from 'date-fns';
import fetcher from '../../../lib/fetcher';
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { props, redirect } = await authUserServerSideProps(context);
	if (redirect) return { redirect, props: {} };
	return { props: { givenName: props?.givenName || null, schedule } };
};

const TimeSection = tw.section`flex flex-col items-center bg-blue-600 text-white flex-1 w-full p-4`;
const TimeSectionInnerContainer = tw.div`flex flex-col gap-2 w-full max-w-[22.5rem]`;
const Input = tw.input`text-black rounded text-center ml-auto flex`;
const Checkbox = tw(Input)`ml-auto`
const NumberInput = tw(Input)`pl-3.5 w-14`;
const TimeInput = tw(Input)`pl-1.5`;
const Div = tw.div`w-full flex items-center gap-1`;

interface Props {
	givenName: string;
	schedule: string;
}
export default function Book(props: Props) {
	const [startTime, setStartTime] = React.useState('12:00');
	const [sessionLength, setSessionLength] = React.useState(60);
	const [sessionsPerShift, setSessionsPerShift] = React.useState(1);
	const [weeksRecurring, setWeeksRecurring] = React.useState(0);
	const [checkboxes, setCheckboxes] = React.useState<boolean[]>(
		new Array(6).fill(false)
	);
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
	const formattedStartDate = format(date, 'EEE do MMMM yy, hh:mm a');
	const formattedEndDate = format(
		addMinutes(date, sessionLength * sessionsPerShift),
		'EEE do MMMM yy, hh:mm a'
	);
	const createShifts = async () => {
		const sessions = [];
		for (let wk = 0; wk < weeksRecurring + 1; wk++) {
			for (let day = 0; day < checkboxes.length + 1; day++) {
				if (day === 0 || checkboxes[day - 1]) {
					for (let session = 0; session < sessionsPerShift; session++) {
						sessions.push({
							time: addDays(
								addWeeks(addMinutes(date, sessionLength * session), wk),
								day
							),
							sessionLength,
							clientId: null,
						});
					}
				}
			}
		}
		try {
			const { res, data } = await fetcher('/api/sessions', sessions);
			if (res.ok) {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Layout
			user={props.givenName}
			title='Show availability here'
			description='Number One Personal Training services'>
			<DateSection {...calendar} />
			<TimeSection>
				<TimeSectionInnerContainer>
					<Div>Shift begins: {formattedStartDate}</Div>
					<Div>Shift ends: {formattedEndDate}</Div>
					<Div>
						Shift Start Time:
						<TimeInput
							type='time'
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
					</Div>
					<Div>
						Session length (minutes):
						<NumberInput
							type='number'
							value={sessionLength}
							min={1}
							onChange={(e) => setSessionLength(Number(e.target.value))}
						/>
					</Div>
					<Div>
						Number of sessions per shift:
						<NumberInput
							type='number'
							value={sessionsPerShift}
							min={1}
							onChange={(e) => setSessionsPerShift(Number(e.target.value))}
						/>
					</Div>
					{checkboxes.map((checkbox, i) => {
						const day: string = format(addDays(date, i + 1), 'EEEE');
						return (
							<Div key={day}>
								Repeat on:{' '}
								<Checkbox
									type='checkbox'
									checked={checkbox}
									onChange={() =>
										setCheckboxes((prevState) => {
											return prevState.map((b, index) =>
												i === index ? !b : b
											);
										})
									}
								/>
								{}
								<label htmlFor={day}>{day}</label>
							</Div>
						);
					})}
					<Div>
						Recurring for:
						<NumberInput
							type='number'
							value={weeksRecurring}
							min={0}
							onChange={(e) => setWeeksRecurring(Number(e.target.value))}
						/>{' '}
						week{weeksRecurring !== 1 && 's'}
					</Div>
					<Button variant={Variant.secondary} onClick={createShifts}>
						Create Shift
					</Button>
					{/* select the days */}
					{/* to have this shift on */}
					{/* select how many weeks to make this shift */}
					{/* reoccuring */}
					{/* infinitely occuring shift */}
				</TimeSectionInnerContainer>
			</TimeSection>
			<Calendar {...calendar} />
		</Layout>
	);
}
