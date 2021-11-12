import { addDays, isWeekend } from 'date-fns';
let schedule = [];
let today = new Date();

for (let daysFromToday = 0; daysFromToday < 90; daysFromToday++) {
	const date = addDays(today, daysFromToday);
	if (!isWeekend(date) && Math.random() < 0.8) {
		const dateObj = {
			date,
			sessions: [],
		};
		for (let slot = 18; slot < 21; slot++) {
			if (Math.random() > 0.5) {
				dateObj.sessions.push({
					time: `${slot}00`,
					clientId: Math.random() > 0.7 ? Math.random() * 1000000 : null,
				});
				dateObj.sessions = dateObj.sessions.filter(
					(session) => !session.clientId
				);
			}
		}
		if (dateObj.sessions.length > 0) schedule.push(dateObj);
	}
}

export default JSON.stringify(schedule);
