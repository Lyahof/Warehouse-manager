import supabase from "./supabase";

export async function getAllIndigoParts(){
	const{data, error} = await supabase
		.from('indigo')
		.select("*")

		if(error){
			console.log(error)
			throw new Error('Данные не были получены')
		}
	return data;
}

export async function getIndigoExpenses(indigoExpenseId){
	const{data: indigoExpensesItem, error} = await supabase
		.from('indigoExpenses')
		.select()
		.eq('indigoId', indigoExpenseId)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории списаний')
		}
	return indigoExpensesItem;
}

//Получает историю приходов из табл indigoReceipts по заданной позиции из таблицы indigo
export async function getIndigoReceipts(indigoReceiptId){
	const {data: indigoReceiptItem, error} = await supabase
		.from('indigoReceipts')
		.select()
		.eq('indigoId', indigoReceiptId)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории пополнений')
		}
	return indigoReceiptItem;
}

//Получает всю историю оплат и дат оплат из indigoReceipts
export async function getAllIndigoPayments(){
	const {data: indigoPayments, error} = await supabase
		.from('indigoReceipts')
		.select('totalPrice, dateOfPayment')

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории пополнений')
		}
	return indigoPayments;
}

export async function createIndigo(newIndigo){
	// Проверяем не существует ли уже такая запись в таблице, чтобы не создать дубль
	const { data: indigo, error: indigoErr } = await supabase
		.from('indigo')
		.select('indigoName')

	if(indigoErr){
		console.error(indigoErr)
		throw new Error('Ошибка при получении наименований')
	}

  const findDuplicate = indigo.some((indigo)=>indigo.indigoName === newIndigo.indigoName)

  if(findDuplicate){
		throw new Error('Такое наименование уже существует в таблице')
	}

	const {data, error} = await supabase
		.from('indigo')
		.insert([newIndigo])
		.select()

		if(error){
			console.error(error)
			throw new Error('Ошибка добавления новой строки в таблицу')
		}
	return data;
}

export async function updateIndigoPlus(indigoToUpdate){
		const {receivedQuantity, totalQuantity: previousValue, id} = indigoToUpdate;
		const totalQuantity = Number(receivedQuantity) + previousValue;

		// Обновляем totalQuantity в таблице 'indigo'
		const { data: updateIndigoData, error: updateIndigoError } = await supabase
			.from('indigo')
			.update({ totalQuantity })
			.eq("id", id)
			.select()

			if(updateIndigoError){
					console.error(updateIndigoError)
					throw new Error('Ошибка пополнения количества')
				}

		const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = indigoToUpdate;

		// Вставка данных в таблицу 'indigoReceipts'
		const {data, error} = await supabase
			.from('indigoReceipts')
			.insert([dataWithoutIdAndTotalQuantity])
			.select()

			if(error){
				console.error(error)

				// Откат к предыдущему значению в таблице 'indigo' если операция пополнения неуспешна
				const { data: rollbackData, error: rollbackError } = await supabase
					.from('indigo')
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

export async function updateIndigoMinus(indigoToUpdate){
	const {shippedQuantity, totalQuantity: previousValue, id} = indigoToUpdate;
	const totalQuantity = previousValue - Number(shippedQuantity);

		// Записываем остаток за вычетом переданного кол-ва в totalQuantity в табл indigo
	const { data: updateIndigoData, error: updateIndigoError } = await supabase
		.from('indigo')
		.update({ totalQuantity })
		.eq("id", id)
		.select()

		if(updateIndigoError){
			console.error(updateIndigoError)
			throw new Error('Ошибка при попытке списания')
		}

	// Выкидываем id и totalQuantity, чтобы все поля передаваемого объекта соотв табл indigoExpences
	const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = indigoToUpdate;

	// Делаем запись о списании в табл indigoExpences
	const {data, error} = await supabase
		.from('indigoExpenses')
		.insert([dataWithoutIdAndTotalQuantity])
		.select()

		if(error){
			console.error(error)

			// Откат к предыдущему значению в таблице 'indigo' если операция добавления в indigoExpences неуспешна
			const { data: rollbackData, error: rollbackError } = await supabase
				.from('indigo')
				.update({ totalQuantity: previousValue })
				.eq("id", id)
				.select()

				if(rollbackError){
					console.error(rollbackError)
					throw new Error('Ошибка')
				}
			throw new Error('Списание не было успешным')		
			}
	return data;
}

export async function deleteIndigoReceipt(id, indigoId, receivedQuantity){
	// До удаления получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('indigoReceipts')
		.select()
		.eq('id', id)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}

	const {error: deletedIndigoReceiptError} = await supabase
		.from('indigoReceipts')
		.delete()
		.eq('id', id)

		if(deletedIndigoReceiptError){
			console.log(deletedIndigoReceiptError)
			throw new Error('Строка поступления не была удалена')
		}

	// Для обновления кол-ва в табл indigo получаем текущее кол-во
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('indigo')
		.select('totalQuantity')
		.eq('id', indigoId)

			if(totalQuantityItemError){
				console.log(totalQuantityItemError)
				await supabase.from('indigoReceipts').insert(deletingData)
				throw new Error('Возникла проблема с обновлением общего количества')
			}

	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity - receivedQuantity;

	// Обновляем общее кол-во в табл indigo
	const {data, error: updateIndigoTableError} = await supabase
		.from('indigo')
		.update({ totalQuantity })
		.eq("id", indigoId)
		.select()

		if(updateIndigoTableError){
			console.log(updateIndigoTableError)
			await supabase.from('indigoReceipts').insert(deletingData)
			throw new Error('Ошибка при изменении общего количества')
		}

	return data;
}

export async function deleteIndigoExpense(id, indigoId, shippedQuantity){
	// Вначале получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('indigoExpenses')
		.select()
		.eq('id', id)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}

	// Удаляем строку расхода из таблицы в indigoExpenses
	const {error: deleteIndigoItemError} = await supabase
		.from('indigoExpenses')
		.delete()
		.eq('id', id)

		if(deleteIndigoItemError){
			console.log(deleteIndigoItemError)
			throw new Error('Строка не была удалена')
		}

	// Получаем общее кол-во материала из табл indigo
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('indigo')
		.select('totalQuantity')
		.eq('id', indigoId)

		if(totalQuantityItemError){
			console.log(totalQuantityItemError)
			await supabase.from('indigoExpenses').insert(deletingData)
			throw new Error('Возникла проблема с обновлением общего количества')
		}

	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity + shippedQuantity;

	// Обновляем общее кол-во материала в табл indigo
	const {data, error: updateIndigoTableError} = await supabase
		.from('indigo')
		.update({ totalQuantity })
		.eq("id", indigoId)
		.select()

		if(updateIndigoTableError){
			console.log(updateIndigoTableError)
			await supabase.from('materialsExpenses').insert(deletingData)
			throw new Error('Ошибка при удалении строки расхода')
		}

return data;
}

export async function deleteIndigo(id) {
	// Удаляет строку из indigo с каскадным удалением записей из таблиц indigoExpenses и indigoReceipts
	const { error } = await supabase
		.from('indigo')
		.delete()
		.eq('id', id)

	if(error){
		console.log(error)
		throw new Error('Ошибка при удалении строки')
	}
}