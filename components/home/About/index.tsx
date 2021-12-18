import React from 'react';
import tw from 'twin.macro';

const Section = tw.section`bg-cyan-100 p-4`;
const Title = tw.h2`text-center text-5xl font-bold font-title text-blue-700 mb-2`;
const Text = tw.p`text-blue-900`
export default function About() {
	return (
		<Section>
			<Title>About Me</Title>
			<Text>
				I get really annoyed seeing how many people engage in a trainer, work
				their ass off, sweat day in, day out and just don&apos;t see the results they
				want. The coach gives you a workout. However, there&apos;s no structure to
				the other 23 hours of your day. With everyone I train, I don&apos;t just give
				them a 45 minute workout, take their money and move onto the next one. I
				invest in them. I provide the lifestyle structure, backed by the science
				they need to actually get their results, and provide effective workouts
				that are goal oriented.
			</Text>
			<Text>
				My knowledge is vast. I&apos;m forever learning and keeping up to date with
				the latest research in exercise science. With this, I’m never too proud
				to change strategy as needed. The objective is to really find what works
				for you. Sometimes, this might take time. It will give you something
				that works for you for life.
			</Text>
		</Section>
	);
}
