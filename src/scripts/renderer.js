import { data } from '../../js/data.js';
import { getData } from './getData.js';
import { createTable } from './createTable.js';
import { createPagination } from './createPagination.js';
import { sortData } from './sortData.js';
import { sortTable } from './sortTable.js';
import { editField } from './editField.js';

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

	[...table.children].forEach((tr) => {
		const colorCell = tr.children[3].nodeName === 'TD' ? tr.children[3] : null;
		if (colorCell) {
			colorCell.firstChild.style.cssText = `
				background-color: ${colorCell.textContent};
				font-size: 0;
				width: 20px;
				heigth: 20px;
				margin: 0 auto;
			`;
		}
	});

	table.addEventListener('click', (e) => sortTable(e, render, pageNum, notesOnPage));

	const pagintaion = createPagination(notesOnPage, requiredData, pageNum);
	const onPageClick = ({ target }) => render(+target.textContent, notesOnPage, sortParam, sortDir);
	pagintaion.addEventListener('click', onPageClick);

	table.addEventListener('click', (e) => editField(e, table));


	const hideCol = (e) => {
		if (e.target.classList.contains('hiding')) {
			[...e.target.closest('table').children].forEach((tr) => {
				tr.children[e.target.closest('th').cellIndex].classList.toggle('hidden');
			});
			e.target.classList.toggle('hiding-active');
		}
	};

	table.addEventListener('click', (e) => hideCol(e, table));

	wrapperElem.innerHTML = '';
	wrapperElem.append(table, pagintaion);
};

export { render };
