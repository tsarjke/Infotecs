import { data } from "../../js/data.js";

// Получение необходимых значений из элемента объекта
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

// Поиск необходимой информации в данных
export const getData = (fullDataArray, requiredData) => fullDataArray.map((item) => getValue(item, requiredData));

// const result = getData(data, ['firstName', 'lastName', 'about', 'eyeColor']);

// console.log(result);
