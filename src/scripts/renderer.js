import { data } from './data.js';
import { getData } from './getData.js';
import { createTable } from './createTable.js';
import { createPagination } from './createPagination.js';
import { sortData } from './sortData.js';
import { sortTable } from './sortTable.js';
import { editField } from './editField.js';
import { hideCol } from './hideColumn.js';

/*
Отрисовка таблицы. Аргументы - номер текущей страницы, количество записей на странице, массив индексов скрытых колонок, параметр сортировки (заголовочная ячейка) и направление сортировки
Необходимые поля из данных указаны вручную
*/

const render = (pageNum, notesOnPage, hiddenIndList = [], sortParam = 0, sortDir) => {
	let requiredData = getData(data, ['firstName', 'lastName', 'about', 'eyeColor']);

	// Если сортировка нужно, то используется sortData. При desc массив разворачивается
	if (sortParam) {
		requiredData = sortData(requiredData, sortParam);
		if (sortDir === 'desc') {
			requiredData.reverse();
		}
	}

	const start = (pageNum - 1) * notesOnPage;
	const end = start + notesOnPage;
	const notes = requiredData.slice(start, end);

	// Обертка таблицы и блока с нумерацией
	const wrapperElem = document.querySelector('.wrapper');
	// Таблицы по количеству записей (автоматически считается по данным). Опционально параметр сортировки (заголовочная ячейка и направление 
	const table = createTable(notes, sortParam, sortDir);

	// Преобразование цвета текстом в квадратики 20х20 пикселей с фоном соответствующего цвета
	// Стили размеров можно вынести в CSS, но цвет из данных все равно придется получать с помощью JS
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

	// Сортировка по клику на заголовочные ячейки. Данные отсортируются, таблица отрисуется заново
	table.addEventListener('click', (e) => sortTable(e, render, pageNum, notesOnPage, hiddenIndList));

	// Создание нумерации по количеству записей на странице, отсортированных данным и текущему номеру
	const pagintaion = createPagination(notesOnPage, requiredData, pageNum);
	// Смена страницы. Отрисовывает таблицу заново, сохраняя сортировку
	const onPageClick = ({ target }) => {
		if (target.nodeName === 'LI') {
			render(+target.textContent, notesOnPage, hiddenIndList, sortParam, sortDir);
		}
	};
	pagintaion.addEventListener('click', onPageClick);

	// Вызов модального окна справа от таблица по высоте ячейки с кликом для редактирования данных
	table.addEventListener('click', (e) => editField(e, table));

	// Скрытите колонки по клику и запись индекса колонки в массив hiddenIndList для отрисовки при смене страницы
	table.addEventListener('click', ({ target }) => {
		hideCol(target);
		if (target.classList.contains('hiding')) {
			const index = target.closest('th').cellIndex;
			if (hiddenIndList.includes(index)) {
				hiddenIndList = hiddenIndList.filter((ind) => ind !== index);
			} else {
				hiddenIndList.push(index);
			}
		}
	});

	// Если были скрыты некоторые колонки ранее, то на новой страницы тоже их необходимо скрыть
	if (hiddenIndList.length > 0) {
		const hidingSpanList = table.querySelectorAll('.hiding');
		[...hidingSpanList].forEach((el) => {
			if (hiddenIndList.includes(el.closest('th').cellIndex)) {
				hideCol(el);
			}
		});
	}

	wrapperElem.innerHTML = '';
	// Добавление готовой таблицы и нумерации с необходимыми данными и обработчиками событий
	wrapperElem.append(table, pagintaion);
};

export { render };
