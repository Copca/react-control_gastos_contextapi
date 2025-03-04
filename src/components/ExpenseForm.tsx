import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { categories } from '../data/categories';
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {
	const { state, dispatch, remainingBudget } = useBudget();
	const [expense, setExpense] = useState<DraftExpense>({
		amount: 0,
		expenseName: '',
		category: '',
		date: new Date()
	});
	const [error, setError] = useState('');
	const [previusAmount, setPreviusAmount] = useState(0);

	// Monitoreamos el cambio en editingId
	useEffect(() => {
		if (state.editingId) {
			const editingExpense = state.expenses.filter(
				(expenseState) => expenseState.id === state.editingId
			)[0];

			setExpense(editingExpense);
			setPreviusAmount(editingExpense.amount);
		}
	}, [state.editingId]);

	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		const isAmountField = ['amount'].includes(name);

		setExpense({
			...expense,
			[name]: isAmountField ? Number(value) || '' : value
		});
	};

	const handleChangeDate = (value: Value) => {
		setExpense({
			...expense,
			date: value
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// validar inputs
		if (Object.values(expense).includes('')) {
			setError('Todos los campos son obligatorios');
			return;
		}

		// Validar que lo gastado no sobrepase el presupuesto
		if (expense.amount - previusAmount > remainingBudget) {
			setError('El gasto se sale del presupuesto');
			return;
		}

		// Agregar o actualizar el gasto
		if (state.editingId) {
			// Nuevo gasto
			dispatch({
				type: 'update-expense',
				payload: { expense: { id: state.editingId, ...expense } }
			});
		} else {
			// Editar gasto
			dispatch({ type: 'add-expense', payload: { expense } });
		}
	};

	return (
		<form className='space-y-5' onSubmit={handleSubmit}>
			<legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
				{state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
			</legend>

			{error && <ErrorMessage>{error}</ErrorMessage>}

			<div className='flex flex-col gap-2'>
				<label htmlFor='expenseName' className='text-xl'>
					Nombre Gasto:
				</label>
				<input
					type='text'
					id='expenseName'
					placeholder='Añade el Nombre del Gasto'
					className='bg-slate-100 p-2'
					name='expenseName'
					value={expense.expenseName}
					onChange={handleChange}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label htmlFor='amount' className='text-xl'>
					Cantidad:
				</label>
				<input
					type='number'
					id='amount'
					placeholder='Añade la Cantidad del Gasto Ej. 300'
					className='bg-slate-100 p-2'
					name='amount'
					value={expense.amount}
					onChange={handleChange}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label htmlFor='category' className='text-xl'>
					Categoría:
				</label>

				<select
					id='category'
					className='bg-slate-100 p-2'
					name='category'
					value={expense.category}
					onChange={handleChange}
				>
					<option value=''>-- Selecione --</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>

			<div className='flex flex-col gap-2'>
				<label htmlFor='expenseName' className='text-xl'>
					Fecha Gasto:
				</label>
				<DatePicker
					className='bg-slate-100 p-2 border-0'
					value={expense.date}
					onChange={handleChangeDate}
				/>
			</div>

			<input
				type='submit'
				className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
				value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
			/>
		</form>
	);
}
