import { data } from "./data.js";

/*
Получение необходимых значений из элемента объекта
Рекурсивно проходит по объектам, содержащим объекты и выносит все на один уровень (например, fisrtName и lastName из name)
*/

const getValue = (dataItem, requiredData) => {
	let newItem = {};
	Object.entries(dataItem).forEach(([key, value]) => {
		if (typeof (value) === 'object') {
			newItem = { ...newItem, ...getValue(value, requiredData) };
		}
		if (requiredData.includes(key)) {
			newItem[key] = value;
		}
	});
	return newItem;
};

// Поиск необходимой информации в данных (массив разделяется на объекты каждого пользователя, а дальше разбирается объект)
export const getData = (fullDataArray, requiredData) => fullDataArray.map((item) => getValue(item, requiredData));
