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

interface State {
	arthritis?: string;
	asthma?: string;
	diabetes?: string;
	dizziness?: string;
	chestPain?: string;
	heartProblemsDisease?: string;
	highCholesterol?: string;
	stroke?: string;
	familyHistoryOfHeartDiseaseOrStroke?: string;
	highBloodPressure?: string;
	lowBloodPressure?: string;
	anyOtherConditions?: string; otherConditions?: string;
	ankleFeet?: string;
	knees?: string;
	hipsPelvis?: string;
	lowerBack?: string;
	shoulders?: string;
	neck?: string;
	elbows?: string;
	wrists?: string;
	muscularPain?: string;
}
export default function MedicalHistory() {
	const [state, setState] = React.useState<State>({ anyOtherConditions: '' });
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

	const nextCondition = (isTrue: boolean = true) => {
		setCurrentCondition(
			(prevCondition) =>
				prevCondition + (currentCondition === 11 && !isTrue ? 2 : 1)
		);
	};

	const updateState = (
		e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement> | boolean
	) => {
		let value: string | boolean = false;
		if (typeof e === 'boolean') {
			value = e
		} else if ('value' in e.target) {
			value = e.target.value;
		}
		setState((prevState) => ({
			...prevState,
			[name || 'anyOtherConditions']: value
		}));
	};

	const handleClick = (
		e: React.MouseEvent<HTMLButtonElement>,
		isTrue: boolean
	) => {
		updateState(isTrue);
		nextCondition(isTrue);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		// e.preventDefault();
		console.log('submitting');
	}; 
	return (
		<Layout
			user=''
			title='Medical History'
			description="Please reveal all the embarrassing info you don't want anybody to see">
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
						<Button onClick={() => nextCondition()}>Continue</Button>
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
							<Button type='button' onClick={(e) => handleClick(e, false)}>
								No
							</Button>
							<Button type='button' onClick={(e) => handleClick(e, true)}>
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
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								updateState(e)
							}
							value={state.anyOtherConditions || ''}
						/>
						<Button
							onClick={() => nextCondition(true)}
							disabled={!state.anyOtherConditions}>
							Next
						</Button>
					</>
				)}
			</Form>
		</Layout>
	);
}
