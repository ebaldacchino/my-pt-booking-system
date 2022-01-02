export interface Session {
	clientId: string | null;
	sessionLength: number;
	time: Date;
	_id: string;
}

export interface Shift {
	date: Date;
	sessions: Session[];
}

export interface UseCalendarProps {
	schedule?: string;
}

export interface CalendarProps {
	currentMonth: number;
	date: Date;
	dateObj: {
		year: number;
		day: number;
		month: number;
	};
	getDaysInMonth: Function;
	lastDay: Date;
	schedule: Session[] | undefined;
	setDate: Function;
	startDay: number;
	today: Date;
	toggleCalendar: () => void;
	viewCalendar: false | Date;
	setViewCalendar: Function;
}

export interface HeaderProps {
	// date: Date;
	dateObj: {
		year: number;
		month: number;
		day: number;
	};
	today: Date;
	viewCalendar: Date;
	setViewCalendar: Function;
	lastDay: Date;
}
