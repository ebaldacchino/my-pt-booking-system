import React from 'react';
import tw from 'twin.macro';
import Layout from '../components/Layout';
import { Button } from '../styles/index';

const Form = tw.form`grid flex-1 gap-4 md:gap-y-8 w-11/12 sm:w-10/12 lg:w-9/12 py-4`;
const FormControl = tw.div`flex flex-col gap-4 justify-between`;
const Label = tw.label``;
const Inputs = tw.div`flex flex-col gap-0.5`;
const RadioButtons = tw(Inputs)`md:flex-row md:gap-2`;
const Checkboxes = tw(Inputs)``;
const InputContainer = tw.div`flex items-center gap-1`;
const Input = tw.input`border p-1`;
const RadioButton = tw.input``;

const Question = ({
	label,
	name,
	updateValues,
	value1,
	value2,
	label1,
	label2,
}) => (
	<FormControl>
		{label && <Label htmlFor={name}>{label}</Label>}
		<RadioButtons onChange={updateValues}>
			<InputContainer>
				<RadioButton name={name} value={value1 || 'true'} type='radio' />
				<Label>{label1 || 'Yes'}</Label>
			</InputContainer>
			<InputContainer>
				<RadioButton name={name} value={value2 || ''} type='radio' />
				<Label>{label2 || 'No'}</Label>
			</InputContainer>
		</RadioButtons>
	</FormControl>
);

const TextInput = ({ label, name, setState }) => (
	<FormControl>
		<Label>{label}</Label>
		<Input
			type='text'
			name={name}
			onChange={(e) =>
				setState((prevState) => ({ ...prevState, [name]: [e.target.value] }))
			}
		/>
	</FormControl>
);

export default function MedicalHistory() {
	const [state, setState] = React.useState({});
	const updateValues = (e) => {
		const { name, value } = e.target;

		setState((prevState) => ({
			...prevState,
			[name]:
				value === 'true' ? [] : value == '' ? value : [...state[name], value],
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(state);
	};
	return (
		<Layout>
			<Form onSubmit={handleSubmit}>
				<Question
					{...{ updateValues }}
					label='1. Has your doctor ever said that you have a heart condition OR high blood pressure??'
					name='heartHealth'
				/>
				{state.heartHealth && (
					<FormControl>
						<Label>
							Please select the appropriate condition. Select ALL that apply.
						</Label>
						<Checkboxes onChange={updateValues}>
							<InputContainer>
								<input
									type='checkbox'
									name='heartHealth'
									value='heart condition'
								/>
								<Label>Heart Condition</Label>
							</InputContainer>
							<InputContainer>
								<input
									type='checkbox'
									name='heartHealth'
									value='high blood pressure'
								/>
								<Label>High Blood Pressure</Label>
							</InputContainer>
						</Checkboxes>
					</FormControl>
				)}
				<Question
					{...{ updateValues }}
					label='2. Do you feel pain in your chest at rest, during your daily activities of living, OR when you do physical activity?'
					name='chestPain'
				/>
				<Question
					{...{ updateValues }}
					label='3. Do you lose balance because of dizziness OR have you lost consciousness in the last 12 months? Please answer NO if your dizziness was associated with over-breathing (including during vigorous exercise).'
					name='dizziness'
				/>
				{state.dizziness && (
					<TextInput
						label='Please list condition(s):'
						{...{ setState }}
						name='dizziness'
					/>
				)}
				<Question
					{...{ updateValues }}
					label='4. Have you ever been diagnosed with another chronic medical condition (other than heart disease or high blood pressure)?'
					name='otherCondition'
				/>
				{state.otherCondition && (
					<TextInput
						label='Please list condition(s):'
						{...{ setState }}
						name='otherCondition'
					/>
				)}
				<Question
					{...{ updateValues }}
					label='5. Are you currently taking prescribed medications for a chronic medical condition?'
					name='medications'
				/>
				{state.medications && (
					<TextInput
						label='Please list condition(s) and medications here:'
						name='medications'
						{...{ setState }}
					/>
				)}
				<Question
					{...{ updateValues }}
					label='6. Do you currently have (or have had within the past 12 months) a bone, joint, or soft tissue (muscle, ligament, or tendon) problem that could be made worse by becoming more physically active? Please answer NO if you had a problem in the past, but it does not limit your current ability to be physically active.'
					name='currentInjury'
				/>
				{state.currentInjury && (
					<TextInput
						label='Please list condition(s) here:'
						name='currentInjury'
						{...{ setState }}
					/>
				)}
				<Question
					{...{ updateValues }}
					label='7. Has your doctor ever said that you should only do medically supervised physical activity?'
					name='medicalSupervision'
				/>
				<Button type='submit' disabled={Object.keys(state).length < 7}>
					Continue
				</Button>
			</Form>
		</Layout>
	);
}
