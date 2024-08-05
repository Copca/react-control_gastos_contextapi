export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
};

export const validNumber = (value: string): string => {
	return value.replace(/^0+(?!\.|$)/, '');
};

export const formatDate = (dateStr: string): string => {
	const dateObjt = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	return new Intl.DateTimeFormat('es-MX', options).format(dateObjt);
};
