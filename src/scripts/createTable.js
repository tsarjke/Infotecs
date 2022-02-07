// Функция для создания таблицы по селектору блока, количеству записей на странице и массиву данных

const createRow = (dataItem, header = false, sortParam, sortDir) => {
	const tableRow = document.createElement('tr');
	let cellTag,
		objMethod;

	if (header === 'header') {
		cellTag = 'th';
		objMethod = 'keys';
	} else {
		cellTag = 'td';
		objMethod = 'values';
	}

	const tableCellsList = [];

	Object[objMethod](dataItem).forEach((value) => {
		const tableCell = document.createElement(cellTag);
		const divForContent = document.createElement('div');
		divForContent.textContent = value;
		if (value === sortParam) {
			if (sortDir === 'asc') {
				tableCell.dataset.sort = 'asc';
			} else {
				tableCell.dataset.sort = 'desc';
			}
		}
		if (header === 'header') {
			const hiddenSpan = document.createElement('span');
			hiddenSpan.classList.add('hiding');
			tableCell.append(divForContent, hiddenSpan);
		} else {
			tableCell.append(divForContent);
		}
		tableCellsList.push(tableCell);
	});

	tableRow.append(...tableCellsList);
	return tableRow;
};

export const createTable = (dataArray, sortParam, sortDir) => {
	// const countOfPages = Math.ceil((dataArray.length - 1) / notesOnPage) + 1;
	const table = document.createElement('table');
	table.classList.add('main-table');
	const tableHeaderRow = createRow(dataArray[0], 'header', sortParam, sortDir);
	const tableRowsList = dataArray.map((item) => createRow(item));
	table.append(tableHeaderRow, ...tableRowsList);
	return table;
};
