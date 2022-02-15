/*
Скрытие колонки по клику на span с .hiding в заголовочной ячейке либо по переданному span'у 
С сохранением скрытых колонок при смене страниц и перерисовки таблицы
Назначает всей колонке класс со стилями, оставляющими 30px ширины (для возможности открытия обратно) и скрывающим данные
*/

export const hideCol = (el) => {
	if (el.classList.contains('hiding')) {
		const index = el.closest('th').cellIndex;
		[...el.closest('table').children].forEach((tr) => {
			tr.children[index].classList.toggle('hidden');
		});
		el.classList.toggle('hiding-active');
	}
};