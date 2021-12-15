import React from 'react';
import tw from 'twin.macro';
import Layout from '../components/Layout';
import { Button, unstyledButton } from '../styles/button';
import { BiArrowBack } from 'react-icons/bi';
import { Input } from '../components/forms';

const Form = tw.form`flex flex-col items-center gap-2 p-4 text-center`;
const Inputs = tw.div`flex flex-col gap-0.5`;
const ButtonsContainer = tw(Inputs)`flex-row gap-2`;
const BackArrow = tw(BiArrowBack)`text-blue-600 text-lg`;
const BackButtonContainer = tw.div`w-full flex mb-3`;
const BackButton = tw(unstyledButton)`flex gap-2 text-sm text-left`;

const conditions = [
	'Arthritis',
	'Asthma',
	'Diabetes',
	'Dizziness',
	'Chest Pain',
	'Heart Problems/disease',
	'High Cholesterol',
	'Stroke',
	'Family history of heart disease or stroke',
	'High blood pressure',
	'Low blood pressure',
	'Any other conditions?',
	null,
	'Ankle/feet',
	'Knees',
	'Hips/Pelvis',
	'Lower Back',
	'Shoulders',
	'Neck',
	'Elbows',
	'Wrists',
	'Muscular Pain',
	null,
];

export default function MedicalHistory() {
	const [state, setState] = React.useState({ otherConditions: '' });
	const [currentCondition, setCurrentCondition] = React.useState(-1);

	const label = conditions[currentCondition] || null;

	const name = label
		?.toLowerCase()
		.split(/[ /]/)
		.map(
			(word, index) =>
				(index ? word[0].toUpperCase() : word[0]) + word.slice(1).toLowerCase()
		)
		.join('')
		.replace('?', '');

	const nextCondition = (value: number) =>
		setCurrentCondition(
			(prevCondition) =>
				prevCondition + (currentCondition === 11 && !value ? 2 : 1)
		);

	const updateState = (value: number) =>
		setState((prevState) => ({
			...prevState,
			[name || 'otherConditions']: value,
		}));

	const handleClick = (value: number) => {
		updateState(value);
		nextCondition(value);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		// e.preventDefault();
		console.log('submitting');
	};

	console.log(state);

	React.useEffect(() => {}, []);

	return (
		<Layout
			user=''
			title='Medical History'
			description="Please reveal all the embarassing info you don't want anybody to see">
			<Form onSubmit={handleSubmit}>
				{currentCondition !== -1 && (
					<BackButtonContainer>
						<BackButton
							type='button'
							onClick={() =>
								setCurrentCondition(
									(prevCondition) =>
										prevCondition -
										(!state.anyOtherConditions && currentCondition === 13
											? 2
											: 1)
								)
							}>
							<BackArrow /> Go Back
						</BackButton>
					</BackButtonContainer>
				)}
				{currentCondition === -1 && (
					<>
						<p>
							In preparation for physical activity, please tell us ALL of your
							existing medical conditions. It is your reponsibility to complete
							this form before participating in any physical activity. For any
							conditions that can be affected by exercise, you may be asked to
							consult your doctor and obtain a written medical clearance to
							exercise. The information contained will be treated as
							confidential and only revealed to relevant staff for your safety.
						</p>
						<Button onClick={nextCondition}>Continue</Button>
					</>
				)}
				{label && (
					<>
						{currentCondition < 12 ? (
							<h1>Do you have, or have you had:</h1>
						) : (
							currentCondition > 12 && (
								<h1>
									Do you have, or have you had
									{currentCondition > 13 && ' pain in your'}:
								</h1>
							)
						)}
						<label htmlFor={name}>{label}</label>
						<ButtonsContainer>
							<Button type='button' onClick={() => handleClick(false)}>
								No
							</Button>
							<Button type='button' onClick={() => handleClick(true)}>
								Yes
							</Button>
						</ButtonsContainer>
					</>
				)}
				{currentCondition === 12 && (
					<>
						<Input
							label='Please list condition(s) here'
							placeHolder='e.g. Pneumonia'
							onChange={(e) => updateState(e.target.value)}
							value={state.otherConditions}
						/>
						<Button onClick={nextCondition} disabled={!state.otherConditions}>
							Next
						</Button>
					</>
				)}
			</Form>
		</Layout>
	);
}
