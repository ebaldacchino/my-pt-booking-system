import { useState, useRef } from 'react';
import { BiCalendarAlt } from 'react-icons/bi';
import { authUserServerSideProps } from '../lib/auth';
import { Title } from '../styles';
import Layout from '../components/Layout';
import tw, { styled } from 'twin.macro';
import { format, addDays } from 'date-fns';

export const getServerSideProps = async (context) =>
	await authUserServerSideProps(context);

const DateSection = tw.section`w-full flex bg-blue-500`;
const Dates = styled.div`
	${tw`flex-1 flex overflow-hidden`}
	${(props) =>
		props.active ? tw`cursor-grabbing transform  scale-50` : tw`cursor-pointer`}
`;
const ItemContainer = tw.div`text-center flex justify-center items-center border p-2 min-w-max`;
const DateListItem = tw(
	ItemContainer
)`min-w-1/3 sm:min-w-1/4 md:min-w-1/5 lg:min-w-1/11`;
const CalendarContainer = tw(
	ItemContainer
)`w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/12`;
const Times = tw.section`bg-red-500 w-full flex-1`;

export default function Book(props) {
	const [isDown, setIsDown] = useState(false);
	const [startX, setStartX] = useState(0);
	const [startScrollLeft, setStartScrollLeft] = useState(0);
	const sliderEl = useRef(null);
	const setIsUp = () => setIsDown(false);
	return (
		<Layout user={props.givenName}>
			<Title>Hello, {props.givenName}</Title>
			<DateSection>
				<Dates
					ref={sliderEl}
					active={isDown ? 'true' : ''}
					onMouseDown={(e) => {
						setIsDown(true);
						setStartX(e.pageX);
						setStartScrollLeft(sliderEl.current.scrollLeft);
					}}
					onMouseLeave={setIsUp}
					onMouseUp={setIsUp}
					onMouseMove={(e) => {
						if (!isDown) return;
						e.preventDefault();
						const walk = e.pageX - startX;
						sliderEl.current.scrollLeft = startScrollLeft - walk;
					}}>
					{new Array(15).fill('').map((_, index) => {
						return (
							<DateListItem key={index}>
								{format(addDays(new Date(), index), 'd MMM')}
							</DateListItem>
						);
					})}
				</Dates>
				<CalendarContainer>
					<BiCalendarAlt />
				</CalendarContainer>
			</DateSection>

			<Times>times section</Times>
		</Layout>
	);
}
