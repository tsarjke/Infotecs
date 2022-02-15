// Сортировка данных по переданному параметру (asc) 

export const sortData = (dataArray, sortParam) => {
	const newDataArray = [...dataArray];
	newDataArray.sort((a, b) => {
		return a[sortParam] > b[sortParam];
	});
	return newDataArray;
};
