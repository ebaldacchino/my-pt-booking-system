import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import Pic from './home_hero_img.jpg';

export const HeroSection = styled.section`
	height: calc(100vh - 5rem);
	${tw`flex flex-col justify-center items-center text-center w-full text-white relative p-6 gap-4 overflow-hidden bg-black bg-opacity-50`}
`;
export const HeroTitle = tw.h2`text-5xl sm:text-6xl font-title font-bold uppercase z-0`;
export const HeroDescription = tw.p`text-xl sm:text-2xl z-0`;
export const HeroButton = tw.button`flex justify-center w-fit mx-auto text-xl sm:text-2xl pb-2 pt-3 px-4 border-3 border-white rounded-3xl hover:(bg-black bg-opacity-30) focus:(outline-none bg-black bg-opacity-50) active:(bg-opacity-70 scale-95) duration-200 z-0`;
const UnstyledHeroImage = tw(Image)`-z-10`;
export const HeroImage = () => (
	<UnstyledHeroImage
		src={Pic}
		alt='Hero Image'
		layout='fill'
		objectFit='cover'
		objectPosition='center'
		placeholder='blur'
	/>
);

export default function Hero() {
	return (
		<HeroSection>
			<HeroImage />
			<HeroTitle>Get ready to change the game</HeroTitle>
			<HeroDescription>
				Start your journey today with a free 30 minute consultation
			</HeroDescription>
			<HeroButton>Get your FREE 30 minute consultation</HeroButton>
		</HeroSection>
	);
}