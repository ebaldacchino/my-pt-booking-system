import tw, { styled } from 'twin.macro';
import type { SectionStyleProps, TextStyleProps } from './types';

export const Section = styled.section`
	${tw`w-full p-4`}
	${(props: SectionStyleProps) =>
		props.white
			? tw`bg-white text-blue-700`
			: props.teal
			? tw`bg-cyan-100 text-blue-700`
			: props.green
			? tw`bg-green-100 text-blue-700`
			: tw`bg-blue-600 text-white`}
`;
export const Text = styled.p`
	${tw`mb-2`}
	${(props: TextStyleProps) => props.dark && tw`text-blue-900`}
`;
