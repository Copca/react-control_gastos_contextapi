import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useBudget } from '../hooks/useBudget';

import AmountDisplay from './AmountDisplay';

export default function BudgetTraker() {
	const { state, totalExpenses, remainingBudget, dispatch } = useBudget();

	const percentaje = +((totalExpenses / state.budget) * 100).toFixed(2);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
			<div className='flex justify-center'>
				<CircularProgressbar
					value={percentaje}
					styles={buildStyles({
						pathColor: percentaje === 100 ? '#dc2626' : '#3b82f6',
						trailColor: '#f5f5f5',
						textSize: 8,
						textColor: '#3b82f6'
					})}
					text={`${percentaje}% Gastado`}
				/>
			</div>

			<div className='flex flex-col justify-center items-center gap-8'>
				<button
					type='button'
					className='bg-pink-600 w-full text-white uppercase font-bold rounded-lg p-2'
					onClick={() => dispatch({ type: 'reset-app' })}
				>
					Resetear App
				</button>

				<AmountDisplay label='Presupuesto' amount={state.budget} />

				<AmountDisplay label='Disponible' amount={remainingBudget} />

				<AmountDisplay label='Gastado' amount={totalExpenses} />
			</div>
		</div>
	);
}
