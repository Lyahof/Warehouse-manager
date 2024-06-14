import * as XLSX from "xlsx/xlsx.mjs";

/* Material name property is different according to what category user wants to download. 
Possible material names listed in materialNames object*/

const materialNames = {
	indigoName: 'indigoName',
	materialName: 'materialName',
	otherName: 'otherName',
	paintName: 'paintName',
}

function getMaterialName(material) {
	for (const key in materialNames) {
			if (material.hasOwn(materialNames[key])) {
			return material[materialNames[key]];
		} 
	}
	return "Не указано";
 } 

function exportToExcel(materials) {
	const materialsToExcel = materials
		.filter((material) => {
		return material.totalQuantity > 0;
	}).map((item) => {
		const materialName = getMaterialName(item);
		console.log(item)
		console.log(materialName)
		const { vendorCode, materialWidth, totalQuantity } = item;
		const result = {
			"Наименование": materialName,
			"Артикул": vendorCode || "Не указано",
			"Количество": totalQuantity,
		}
			if(materialWidth !== undefined) {
				result["Ширина пореза"] = materialWidth
			}

		return result;
	});

	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.json_to_sheet(materialsToExcel);
	XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
	XLSX.writeFile(wb, "Выгрузка_остатка.xlsx");
 }

 export default exportToExcel;