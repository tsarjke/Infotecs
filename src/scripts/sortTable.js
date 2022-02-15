/*
Назначение направления сортировки для заголовочной ячейки таблицы (чтоб потом отрисовать заново с сортированными данными)
Клик по заголовочной ячейке, но не по спану внутри длс скрытия колонки
Аргументы - событие, функция обработки и другие аргументы (pageNum, notesOnPage для renderer)
*/

export function sortTable(event, callback) {
	const [{ target }, func, ...args] = arguments;
	const tableHeader = target.nodeName === 'TH' ? target : target.parentNode;
	if (tableHeader.nodeName === 'TH' && target.nodeName !== 'SPAN') {
		const direction = tableHeader.dataset.sort === 'asc' ? 'desc' : 'asc';
		func(...args, tableHeader.textContent, direction);
	}
}
