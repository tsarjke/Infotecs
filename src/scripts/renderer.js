import { data } from '../../js/data.js';
import { getData } from './getData.js';
import { createTable } from './createTable.js';
import { createPagination } from './createPagination.js';
import { sortData } from './sortData.js';

const render = (pageNum, notesOnPage, sortParam = 0, sortDir) => {
	let requiredData = getData(data, ['firstName', 'lastName', 'about', 'eyeColor']);
	if (sortParam) {
		requiredData = sortData(requiredData, sortParam);
		if (sortDir === 'desc') {
			requiredData.reverse();
		}
	}

	const start = (pageNum - 1) * notesOnPage;
	const end = start + notesOnPage;
	const notes = requiredData.slice(start, end);

	const wrapperElem = document.querySelector('.wrapper');
	const table = createTable(notes, sortParam, sortDir);

	const sortTable = ({ target }) => {
		const tableHeader = target.nodeName === 'TH' ? target : target.parentNode;
		if (!(tableHeader.nodeName === 'TH')) {
			return;
		}
		if (tableHeader.dataset.sort === 'asc') {
			render(pageNum, notesOnPage, tableHeader.textContent, 'desc');
		} else {
			render(pageNum, notesOnPage, tableHeader.textContent, 'asc');
		}
	};
	table.addEventListener('click', sortTable);

	const pagintaion = createPagination(notesOnPage, requiredData, pageNum);
	const onPageClick = ({ target }) => render(+target.textContent, notesOnPage, sortParam, sortDir);
	pagintaion.addEventListener('click', onPageClick);

	wrapperElem.innerHTML = '';
	wrapperElem.append(table, pagintaion);
};

export { render };
