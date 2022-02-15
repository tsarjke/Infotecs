/*
Создание ряда для таблицы и заполнение необходиымыми данными. Аргументы - данные, хедер ('header'/false), 
параметр сортировки (название столбца) и направление (asc или desc)
Если header, то дополнительные данные для сортировки
Данные внутри ячейки в div'ах для удобства стилизации
Возвращает ряд заполненный данными ряд tr для таблицы
*/

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

// Создание таблицы по данным, параметру сортировки (название столбца) и направлению сортировки (asc или desc)
// Возвращает таблицу с данными (сортированными, если задан sortParam) и заголовком
export const createTable = (dataArray, sortParam, sortDir) => {
	const table = document.createElement('table');
	table.classList.add('main-table');
	const tableHeaderRow = createRow(dataArray[0], 'header', sortParam, sortDir);
	const tableRowsList = dataArray.map((item) => createRow(item));
	table.append(tableHeaderRow, ...tableRowsList);
	return table;
};
