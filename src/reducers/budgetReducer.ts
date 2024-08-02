/**
 * Actions
 */
export type BudgetActions = { type: 'add-budget'; payload: { budget: number } };

/**
 * State
 */
export type BudgetState = {
	budget: number;
};

export const initialState: BudgetState = {
	budget: 0
};

/**
 * Reducer
 */
export const budgetReducer = (state: BudgetState, action: BudgetActions) => {
	if (action.type === 'add-budget') {
		return {
			...state,
			budget: action.payload.budget
		};
	}

	return state;
};
