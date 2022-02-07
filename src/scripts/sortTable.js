export function sortTable(event, callback) {
	const [{ target }, func, ...args] = arguments;
	const tableHeader = target.nodeName === 'TH' ? target : target.parentNode;
	if (tableHeader.nodeName === 'TH' && target.nodeName !== 'SPAN') {
		const direction = tableHeader.dataset.sort === 'asc' ? 'desc' : 'asc';
		func(...args, tableHeader.textContent, direction);
	}
}
