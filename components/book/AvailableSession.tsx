import { addMinutes, format } from 'date-fns';
import React from 'react';
import { Button, Variant } from '../../styles/button';
import tw from 'twin.macro';

const SlotContainer = tw.div`bg-blue-500 border-[3px] rounded-lg border-blue-200 flex flex-wrap gap-4 w-full justify-between items-center p-4`;
const Time = tw.span`m-auto`;
const BookButton = tw(Button)`m-auto`;
const AvailableSession = ({
	time,
	sessionLength,
}: {
	time: Date;
	sessionLength: number;
	key: number;
}) => {
	const date = new Date(time);
	const startOfSession = format(date, 'h:mm a');
	const endOfSession = format(addMinutes(date, sessionLength), 'h:mm a');
	const handleClick = () => {
        console.log(time)
    };
	return (
		<SlotContainer>
			<Time>
				{startOfSession} - {endOfSession}
			</Time>
			<BookButton variant={Variant.secondary} onClick={handleClick}>
				Book Today
			</BookButton>
		</SlotContainer>
	);
};

export default AvailableSession;
