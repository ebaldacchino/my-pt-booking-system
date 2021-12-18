import React from 'react';
import tw from 'twin.macro';

const Section = tw.section`bg-blue-500 p-4 text-white`;
const Title = tw.h2`text-center text-4xl sm:text-5xl font-bold font-title mb-2`;
const Text = tw.p`mb-2`;

export default function Testimonials() {
	return (
		<Section>
			<Title>Testimonials</Title>
			<Text>
				Hi. My name is Maseh Nuristani. A former world title holder in
				kickboxing, I sought Eddy&apos;s services when I was at a low point of my
				career. Coming off a loss for the Australian title, I suffered a lot of
				injuries and seriously considered retirement.
			</Text>
			<Text>
				I stepped away from the sport and ran through a 4 month strength and conditioning program with Eddy. I came
				back to training camp with zero injuries and significant improvements in strength,
				speed and power. Thanks to Eddy&apos;s training, I was able to perform at a completely
				different level in my next fight, winning the Commonwealth title.
			</Text>
			<Text>
				I continued to use Eddy&apos;s programming throughout my career, and couldn&apos;t recommend him highly enough.
			</Text>
		</Section>
	);
}
