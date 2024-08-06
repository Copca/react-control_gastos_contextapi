import { useBudget } from './hooks/useBudget';

import BudgetForm from './components/BudgetForm';
import { useEffect, useMemo } from 'react';
import BudgetTraker from './components/BudgetTraker';
import ExpenseModal from './components/ExpenseModal';
import ExpenseList from './components/ExpenseList';
import FilterByCategory from './components/FilterByCategory';

function App() {
	const { state } = useBudget();

	const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

	//Guardamos en LS cuanto el state cambie
	useEffect(() => {
		localStorage.setItem('budget', JSON.stringify(state.budget));
		localStorage.setItem('expenses', JSON.stringify(state.expenses));
	}, [state]);

	return (
		<>
			<header className='bg-blue-600 max-h-72 py-8'>
				<h1 className='uppercase text-center font-black text-4xl text-white'>
					Planificador de Gastos
				</h1>
			</header>

			<div className='max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10'>
				{isValidBudget ? <BudgetTraker /> : <BudgetForm />}
			</div>

			{isValidBudget && (
				<main className='max-w-3xl mx-auto py-10'>
					<FilterByCategory />

					<ExpenseList />

					<ExpenseModal />
				</main>
			)}
		</>
	);
}

export default App;
