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

		const onCanceBtnClick = () => {
			editFieldElem.style.display = 'none';
			editBtn.removeEventListener('click', onEditBtnClick);
		};
		cancelBtn.addEventListener('click', onCanceBtnClick);
		textareaElem.value = tableCell.firstChild.textContent;
		textareaElem.focus();
		const tableRightBorder = table.getBoundingClientRect().right;
		const cellTopBorder = tableCell.getBoundingClientRect().top;
		editFieldElem.style.top = `${cellTopBorder + scrollY}px`;
		editFieldElem.style.left = `${tableRightBorder + scrollX + 5}px`;
	}
};
