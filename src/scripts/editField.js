/*
Поле для редактирования данных. Аргументы - таргет клика и таблица сама
Справа от таблицы по высоте ячейки с кликом появляется поле с данными из ячейки, по которой был осуществлен клика
Есть возможность изменить данные и записать в таблицу или закрыть окно
После изменения окно закрывается (display: none)
Меняет как данные по цвету, так и сам цвет, но при ошибочном вводе цвете данные примет, но покажет крестик в таблице
* Изменения при перерисовке исчезают
*/

export const editField = ({ target }, table) => {
	const tableCell = target.nodeName === 'TD' ? target : target.parentNode;
	const editFieldElem = document.querySelector('.edit-field');

	if (tableCell.nodeName === 'TD' && editFieldElem.style.display !== 'block') {
		const textareaElem = editFieldElem.querySelector('textarea');
		const editBtn = editFieldElem.querySelector('.edit-field__edit-btn');
		const cancelBtn = editFieldElem.querySelector('.edit-field__cancel-btn');

		editFieldElem.style.display = 'block';

		const onEditBtnClick = () => {
			tableCell.firstChild.textContent = textareaElem.value;
			if (tableCell.cellIndex === 3 && tableCell.firstChild.style.backgroundColor !== tableCell.textContent) {
				tableCell.firstChild.style.backgroundColor = tableCell.textContent;
				tableCell.firstChild.style.backgroundColor !== tableCell.textContent ? tableCell.firstChild.classList.add('wrong-color') : tableCell.firstChild.classList.remove('wrong-color');
			}
			editFieldElem.style.display = 'none';
			editBtn.removeEventListener('click', onEditBtnClick);
		};

		editBtn.addEventListener('click', onEditBtnClick);

		const onCancelBtnClick = () => {
			editFieldElem.style.display = 'none';
			editBtn.removeEventListener('click', onEditBtnClick);
		};

		cancelBtn.addEventListener('click', onCancelBtnClick);
		textareaElem.value = tableCell.firstChild.textContent;
		textareaElem.focus();
		const tableRightBorder = table.getBoundingClientRect().right;
		const cellTopBorder = tableCell.getBoundingClientRect().top;
		editFieldElem.style.top = `${cellTopBorder + scrollY}px`;
		editFieldElem.style.left = `${tableRightBorder + scrollX + 5}px`;
	}
};
