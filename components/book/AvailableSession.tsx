import { addMinutes, format } from 'date-fns';
import React from 'react';
import { Button, Variant } from '../../styles/button';
import tw from 'twin.macro';
import fetcher from '../../lib/fetcher';

const SlotContainer = tw.div`bg-blue-500 border-[3px] rounded-lg border-blue-200 flex flex-wrap gap-4 w-full justify-between items-center p-4`;
const Time = tw.span`m-auto`;
const BookButton = tw(Button)`m-auto`;

const AvailableSession = ({
	time,
	sessionLength,
	clientId,
	admin,
	_id,
	filterSchedule,
}: {
	time: Date;
	sessionLength: number;
	clientId?: null | string;
	admin?: boolean;
	key: string;
	_id: string;
	filterSchedule?: (id: string) => void;
}) => {
	const date = new Date(time);
	const startOfSession = format(date, 'h:mm a');
	const endOfSession = format(addMinutes(date, sessionLength), 'h:mm a');
	const modifySession = async (method: 'PUT' | 'DELETE' = 'DELETE') => {
		try {
			const { res } = await fetcher('/api/sessions', {
				method,
				body: { _id },
			});
			if (res.ok && filterSchedule) filterSchedule(_id);
		} catch (err) {
			console.log(err);
		}
	};

	const BookingPageSession = () => (
		<BookButton
			variant={Variant.secondary}
			onClick={() => modifySession('PUT')}>
			Book Today
		</BookButton>
	);
	const AdminSession = () => {
		return (
			<>
			{/* should display user's name. Then, on click, view user's profile */}
				{clientId ?? 'Session is still empty'}
				<BookButton
					variant={Variant.secondary}
					onClick={() => modifySession('DELETE')}>
					Cancel Session
				</BookButton>
			</>
		);
	};
	return (
		<SlotContainer>
			<Time>
				{startOfSession} - {endOfSession}
			</Time>
			{admin ? <AdminSession /> : <BookingPageSession />}
		</SlotContainer>
	);
};

export default AvailableSession;
