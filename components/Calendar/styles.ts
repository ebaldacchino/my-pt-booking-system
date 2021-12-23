import tw, { styled } from 'twin.macro';
import { unstyledButton } from '../../styles/button';

interface DayProps {
	children: number;
	disabled: boolean;
	isMuted: boolean;
	isSameSelected: boolean;
	isSelected: boolean;
	isToday: boolean;
}

const Frame = styled.div`
	width: 400px;
	${tw`mx-auto bg-white border shadow-lg max-w-full rounded z-10 select-none`}
`;
const Header = tw.div`text-lg font-bold pt-2 flex justify-between items-center`;
const Body = tw.div`flex flex-wrap w-full`;
const DaysOfWeekContainer = tw.div`border-b flex w-full`;
const DayOfWeek = tw.div`flex-1 text-center text-sm py-2 font-semibold`;
const DefaultButton = styled(unstyledButton)`
	${(props) => props.disabled && tw`text-gray-200 cursor-default`}
`;
const IconButton = styled(DefaultButton)`
	${tw`flex justify-center items-center text-4xl w-10`}
	${(props) =>
		!props.disabled &&
		tw`text-blue-500 focus:text-blue-600 hover:text-blue-600 active:text-blue-700 focus:scale-95`}
`;
const Day = styled(DefaultButton)`
	--margin: 0.35rem;
	width: calc(100% / 7 - var(--margin) * 2);
	margin: var(--margin);
	height: calc(400px / 7 - var(--margin) * 2);
	max-height: calc(100vw / 7 - var(--margin) * 2);
	@media (max-width: 300px) {
		font-size: 6vw;
	}
	${tw`flex items-center justify-center rounded-full text-lg  focus:scale-100`}
	${(props: DayProps) => props.isToday && tw`font-bold`}
	${(props: DayProps) =>
		!props.disabled && props.isSameSelected && tw`ring-2 ring-blue-500`}
	${(props: DayProps) =>
		!props.disabled &&
		!props.isSelected &&
		tw`transition-colors duration-200 hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 active:bg-gray-200 active:text-gray-900`}
	${(props: DayProps) => { 
		if (!props.disabled) {
			return props.isMuted
				? tw`text-gray-400`
				: props.isSelected
				? tw`bg-blue-700 text-white`
				: tw`text-blue-500`;
		}
	}}
`; 
const ButtonContainer = tw.div`flex border-t justify-end`;
const CancelButton = tw.button`ml-auto px-2 py-1 text-blue-500 hover:underline focus:text-blue-700 duration-200 outline-none`;
export {
	Body,
	CancelButton,
	Day,
	DayOfWeek,
	DaysOfWeekContainer,
	DefaultButton,
	ButtonContainer,
	Frame,
	Header,
	IconButton,
};
