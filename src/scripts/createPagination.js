/* 
Создание списка с номерами страниц. Аргументы - количество записей на странице, данные и активная страница (для доп. класса)
Возвращает список ul с номерами страниц от 1 до countOfPages
*/

export const createPagination = (notesOnPage, dataArray, activePage) => {
	const countOfPages = Math.ceil(dataArray.length  / notesOnPage) + 1;

	const pagesList = [];
	for (let i = 1; i < countOfPages; i++) {
		const pageElem = document.createElement('li');
		pageElem.innerHTML = i;
		if (i === activePage) {
			pageElem.classList.add('active');
		}
		pagesList.push(pageElem);
	}

	const pagination = document.createElement('ul');
	pagination.classList.add('pagination');
	pagination.append(...pagesList);

	return pagination;
};
