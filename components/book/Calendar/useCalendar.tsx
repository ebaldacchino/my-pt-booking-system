import { useState, useEffect } from 'react';

const today = new Date();
const currentMonth = today.getMonth();
const getStartDayOfMonth = (date) => {
	const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	return startDate === 0 ? 7 : startDate;
};

const useCalendar = () => {
	const [date, setDate] = useState(today);
	const [dateObj, setDateObj] = useState({
		day: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	});
	const [viewCalendar, setViewCalendar] = useState(false);
	const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
	
	const toggleCalendar = () => setViewCalendar(!viewCalendar && date);

	useEffect(() => {
		const d = viewCalendar || date;
		setStartDay(getStartDayOfMonth(d));
		setDateObj({
			day: d.getDate(),
			month: d.getMonth(),
			year: d.getFullYear(),
		});
	}, [date, viewCalendar]);

	const getDaysInMonth = (year, month) =>
		new Date(year, month + 1, -1).getDate();

	return {
		currentMonth,
		date,
		dateObj,
		getDaysInMonth,
		setDate,
		startDay,
		today,
		toggleCalendar,
		viewCalendar,
		setViewCalendar,
	};
};

export default useCalendar;
