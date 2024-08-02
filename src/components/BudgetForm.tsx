import { ChangeEvent, useState, MouseEvent, useMemo } from 'react';

export default function BudgetForm() {
	const [budget, setBudget] = useState(0);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setBudget(e.target.valueAsNumber);
	};

	// Validando input budget
	const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

	const handleSubmit = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
		e.preventDefault();
	};

	return (
		<form className='space-y-5'>
			<div className='flex flex-col space-y-5'>
				<label htmlFor='budget' className='text-4xl text-blue-600 font-bold text-center'>
					Definir presupuesto
				</label>

				<input
					id='budget'
					type='number'
					className='w-full bg-white border border-gray-200 p-2'
					placeholder='Define presupuesto'
					name='buget'
					onChange={handleChange}
					value={budget}
				/>
			</div>

			<input
				type='submit'
				className='bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase cursor-pointer w-full p-2 disabled:opacity-40'
				disabled={isValid}
				onClick={(e) => handleSubmit(e)}
				value={'Definir presupuesto'}
			/>
		</form>
	);
}
