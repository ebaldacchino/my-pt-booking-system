import { useState, useEffect } from 'react';
import { addYears, isBefore, isSameDay } from 'date-fns';
import type { Session, Shift, UseCalendarProps } from './types';
const today = new Date();
const currentMonth = today.getMonth();
const getStartDayOfMonth = (date: Date) => {
	const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	return startDate === 0 ? 7 : startDate;
};

const useCalendar = (props?: UseCalendarProps) => {
	const schedule: Shift[] =
		(props?.schedule &&
			typeof props.schedule === 'string' &&
			JSON.parse(props.schedule)
				.map(({ date, sessions }: Shift) => {
					sessions = sessions.map((session) => {
						return {
							...session,
							time: new Date(session.time),
						};
					});
					return {
						date: new Date(date),
						sessions,
					};
				}).filter((shift: Shift) => {
					return !isBefore(shift.date, today)
				}) 
				.sort((a: Shift, b: Shift) => {
					return a.date.getTime() - b.date.getTime();
				})) ||
		null;
	const [date, setDate] = useState<Date>(
		(schedule && schedule[0]?.date) || today
	);
	const [slots, setSlots] = useState<Session[]>(
		(schedule && schedule[0]?.sessions) || []
	);
	const [dateObj, setDateObj] = useState({
		day: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	});
	const [viewCalendar, setViewCalendar] = useState<Date | false>(false);
	const [startDay, setStartDay] = useState<number>(getStartDayOfMonth(date));
	const toggleCalendar = () => setViewCalendar(!viewCalendar && date);
	const lastDay: Date =
		(schedule && schedule[schedule.length - 1].date) || addYears(today, 1); 
	useEffect(() => {
		const d = viewCalendar || date;
		setStartDay(getStartDayOfMonth(d));
		setDateObj({
			day: d.getDate(),
			month: d.getMonth(),
			year: d.getFullYear(),
		});
		const data = schedule?.find((props: Shift) =>
			isSameDay(props.date, date)
		)?.sessions;
		setSlots(data || []);
	}, [date, viewCalendar]);

	const getDaysInMonth = (year: number, month: number) =>
		new Date(year, month + 1, -1).getDate();

	return {
		currentMonth,
		date,
		dateObj,
		getDaysInMonth,
		lastDay,
		schedule,
		setDate,
		slots,
		startDay,
		today,
		toggleCalendar,
		viewCalendar,
		setViewCalendar,
	};
};

export default useCalendar;
