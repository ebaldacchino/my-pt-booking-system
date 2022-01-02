import React, { useState } from 'react';
import { addYears, isSameDay } from 'date-fns';
import type { Session, UseCalendarProps } from './types';
const today = new Date();
const currentMonth = today.getMonth();
const getStartDayOfMonth = (date: Date) => {
	const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	return startDate === 0 ? 7 : startDate;
};

const formatSchedule = (
	schedule: string | undefined
): Session[] | undefined => {
	return (
		(
			schedule &&
			typeof schedule === 'string' &&
			JSON.parse(schedule).map((session: Session) => {
				return { ...session, time: new Date(session.time) };
			})
		)?.sort((a: Session, b: Session) => {
			return a.time.getTime() - b.time.getTime();
		}) || undefined
	);
};

const useCalendar = (props?: UseCalendarProps) => {
	const [schedule, setSchedule] = React.useState(
		formatSchedule(props?.schedule)
	);
	const [date, setDate] = useState<Date>(
		(schedule && schedule[0]?.time) || today
	);
	const [slots, setSlots] = useState<Session[]>(schedule || []);
	const [dateObj, setDateObj] = useState({
		day: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	});
	const [viewCalendar, setViewCalendar] = useState<Date | false>(false);
	const [startDay, setStartDay] = useState<number>(getStartDayOfMonth(date));
	const toggleCalendar = () => setViewCalendar(!viewCalendar && date);
	const lastDay: Date =
		(schedule && schedule[schedule.length - 1].time) || addYears(today, 1);
	React.useEffect(() => {
		const d = viewCalendar || date;
		setStartDay(getStartDayOfMonth(d));
		setDateObj({
			day: d.getDate(),
			month: d.getMonth(),
			year: d.getFullYear(),
		});
		const newSlots =
			schedule?.filter((session) => {
				return isSameDay(session.time, date);
			}) || [];
		setSlots(newSlots);
	}, [date, viewCalendar, schedule]);

	const getDaysInMonth = (year: number, month: number) =>
		new Date(year, month + 1, -1).getDate();
	const filterSchedule = (id: string) => {
		if (typeof schedule === 'undefined') return;
		setSchedule((prevSchedule) => {
			return prevSchedule?.filter((session) => session._id !== id);
		});
	};
	return {
		currentMonth,
		date,
		dateObj,
		getDaysInMonth,
		filterSchedule,
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
