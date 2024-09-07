export const roundNumber2Digits = (num) => {
	if (isNaN(num)) {
		return;
	}

	return (+num).toFixed(2);
};