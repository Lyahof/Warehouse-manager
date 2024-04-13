
import { getToday } from "../utils/DateHelpers";
import supabase from "./supabase";

export async function getMaterials(){
	const {data, error} = await supabase 
		.from('materials')
		.select('*')
	if(error){
		console.log(error)
		throw new Error('Не удалось загрузить таблицу материалов')
	}
	return data;
}

export async function getMaterialReceipts(materialReceiptId){
	const {data, error} = await supabase
		.from('materialsReceipts')
		.select()
		.eq('materialId', materialReceiptId)

		if(error){
			console.log(error)
			throw new Error('Не удалось загрузить таблицу материалов')
		}
	return data;
}

//Получает всю историю оплат и дат оплат из materialsReceipts
export async function getAllMaterialPayments(){
	const {data: materialPayments, error} = await supabase
		.from('materialsReceipts')
		.select('totalPrice, dateOfPayment')

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории пополнений')
		}
	return materialPayments;
}

/* // Получает затраты на материалы для Дашборда. date д.б. в формате ISOString
export async function getPaymentsAfterDate(tableName, queryDate) {
	const { data, error } = await supabase
		.from(tableName)
		.select("dateOfPayment, totalPrice")
		.gte("dateOfPayment", queryDate)
		.lte("dateOfPayment", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Данные не были загружены");
	}

	return data;
} */

export async function getMaterialExpenses(materialExpenseId){
	const {data, error} = await supabase
		.from('materialsExpenses')
		.select()
		.eq('materialId', materialExpenseId)

		if(error){
			console.log(error)
			throw new Error('Не удалось загрузить таблицу материалов')
		}
	return data;
}

export async function createNewMaterial(newMaterial){
	// Проверяем не существует ли уже такая запись в таблице, чтобы не создать дубль
	const { data: materials, error: materialErr } = await supabase
		.from('materials')
		.select('materialName')

	if(materialErr){
		console.error(materialErr)
		throw new Error('Ошибка при получении наименований')
	}

	const findDuplicate = materials.some((material)=>material.materialName === newMaterial.materialName)

	if(findDuplicate){
		throw new Error('Такое наименование уже существует в таблице')
	}

	const {data, error} = await supabase
		.from('materials')
		.insert([newMaterial])
		.select()

		if(error){
			console.error(error)
			throw new Error('Не удалось создать запись в разделе "Материалы"')
		}
	return data;
}

export async function updateMaterialPlus(materialToUpdate){
	const {receivedQuantity, totalQuantity: previousValue, id} = materialToUpdate;
	const totalQuantity = Number(receivedQuantity) + previousValue;

	// Обновляем totalQuantity в таблице 'materials'
	const { data: updateMaterialData, error: updateMaterialError } = await supabase
		.from('materials')
		.update({ totalQuantity })
		.eq("id", id)
		.select()

		if(updateMaterialError){
				console.error(updateMaterialError)
				throw new Error('Ошибка пополнения количества')
		}

	const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = materialToUpdate;
	// Вставка данных в таблицу 'materialsReceipts'
	const {data, error} = await supabase
		.from('materialsReceipts')
		.insert([dataWithoutIdAndTotalQuantity])
		.select()

		if(error){
			console.error(error)

			// Откат к предыдущему значению в таблице 'materials' если операция пополнения неуспешна
			const { data: rollbackData, error: rollbackError } = await supabase
				.from('materials')
				.update({ totalQuantity: previousValue })
				.eq("id", id)
				.select()

				if(rollbackError){
					console.error(rollbackError)
					throw new Error('Ошибка')
				}
			throw new Error('Добавление в таблицу не было успешным')		
		}
	return data;
}

export async function updateMaterialMinus(materialToUpdate){
	const {shippedQuantity, totalQuantity: previousValue, id} = materialToUpdate;
	const totalQuantity = previousValue - Number(shippedQuantity);

	// Записываем остаток за вычетом переданного кол-ва в totalQuantity в табл materials
	const { data: updateMaterialData, error: updateMaterialError } = await supabase
		.from('materials')
		.update({ totalQuantity })
		.eq("id", id)
		.select()

		if(updateMaterialError){
			console.error(updateMaterialError)
			throw new Error('Ошибка при попытке списания материала')
		}

	// Выкидываем id и totalQuantity, чтобы все поля передаваемого объекта соотв полям табл materialsExpenses
	const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = materialToUpdate;

	// Делаем запись о списании в табл materialsExpenses
	const {data, error} = await supabase
		.from('materialsExpenses')
		.insert([dataWithoutIdAndTotalQuantity])
		.select()

		if(error){
			console.error(error)			
			// Откат к предыдущему значению в таблице 'materials' если операция добавления в materialsExpenses неуспешна
			const { data: rollbackData, error: rollbackError } = await supabase
				.from('materials')
				.update({ totalQuantity: previousValue })
				.eq("id", id)
				.select()		
		
				if(rollbackError){
					console.error(rollbackError)
					throw new Error('Ошибка списания из таблицы расходов')
				}
			throw new Error('Ошибка при попытке списания')
		}

	return data;
}


export async function deleteMaterialReceipt(id, materialId, receivedQuantity){
	// До удаления получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('materialsReceipts')
		.select()
		.eq('id', id)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}

	const {error: deletedMaterialReceiptError} = await supabase
		.from('materialsReceipts')
		.delete()
		.eq('id', id)

		if(deletedMaterialReceiptError){
			console.log(deletedMaterialReceiptError)
			throw new Error('Строка поступления не была удалена')
		}

	// Для обновления кол-ва материала в табл materials вначале получаем его текущее кол-во
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('materials')
		.select('totalQuantity')
		.eq('id', materialId)

		if(totalQuantityItemError){
			console.log(totalQuantityItemError)
			await supabase.from('materialsReceipts').insert(deletingData)
			throw new Error('Возникла проблема с обновлением общего количества')
		}

	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity - receivedQuantity;

	// Обновляем общее кол-во в табл materials
	const {data, error: updateMaterialTableError} = await supabase
		.from('materials')
		.update({ totalQuantity })
		.eq("id", materialId)
		.select()

		if(updateMaterialTableError){
			console.log(updateMaterialTableError)
			await supabase.from('materialsReceipts').insert(deletingData)
			throw new Error('Ошибка при изменении общего количества')
		}
	return data;
}

export async function deleteMaterialExpense(id, materialId, shippedQuantity){
	// Вначале получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('materialsExpenses')
		.select()
		.eq('id', id)

			if(error){
				console.error(error)
				throw new Error('Ошибка при получении данных')
			}
	// Удаляем строку расхода из таблицы materialsExpenses
	const {error: deleteMaterialExpenseError} = await supabase
		.from('materialsExpenses')
		.delete()
		.eq('id', id)

		if(deleteMaterialExpenseError){
			console.log(deleteMaterialExpenseError)
			throw new Error('Строка не была удалена')
		}
	// Получаем общее кол-во материала из табл materials
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('materials')
		.select('totalQuantity')
		.eq('id', materialId)

		if(totalQuantityItemError){
			console.log(totalQuantityItemError)			
			await supabase.from('materialsExpenses').insert(deletingData)
			throw new Error('Возникла проблема с обновлением общего количества')
		}

	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity + shippedQuantity;

	// Обновляем общее кол-во материала в табл materials
	const {data, error: updateMaterialsTableError} = await supabase
		.from('materials')
		.update({ totalQuantity })
		.eq("id", materialId)
		.select()

		if(updateMaterialsTableError){
			console.log(updateMaterialsTableError)
			await supabase.from('materialsExpenses').insert(deletingData)
			throw new Error('Ошибка при удалении строки расхода')
		}

	return data;
}

export async function deleteMaterial(id){
	// Удаляет материал из materials с каскадным удалением записей из таблиц materialsExpenses и materialsReceipts
	const { error } = await supabase
		.from('materials')
		.delete()
		.eq('id', id)

	if(error){
		console.log(error)
		throw new Error('Ошибка при удалении строки')
	}
}