import { useState, useEffect } from 'react';
import { isSameDay } from 'date-fns';
const today = new Date();
const currentMonth = today.getMonth();
const getStartDayOfMonth = (date: Date) => {
	const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	return startDate === 0 ? 7 : startDate;
};

const useCalendar = (props: any) => {
	const schedule = JSON.parse(props.schedule).map(
		({ date, sessions }: { date: Date; sessions: string[] }) => {
			return {
				date: new Date(date),
				sessions,
			};
		}
	);
	const [date, setDate] = useState<Date>(schedule[0].date);
	const [slots, setSlots] = useState<
		{ clientId: string | null; time: string }[]
	>(schedule[0].sessions);
	const [dateObj, setDateObj] = useState({
		day: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	});
	const [viewCalendar, setViewCalendar] = useState<Date | false>(false);
	const [startDay, setStartDay] = useState<number>(getStartDayOfMonth(date));
	const toggleCalendar = () => setViewCalendar(!viewCalendar && date);
	const lastDay: Date = schedule[schedule.length - 1].date;

	useEffect(() => {
		const d = viewCalendar || date;
		setStartDay(getStartDayOfMonth(d));
		setDateObj({
			day: d.getDate(),
			month: d.getMonth(),
			year: d.getFullYear(),
		});
		const data = schedule.find((props: { date: Date; sessions: string[] }) =>
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
