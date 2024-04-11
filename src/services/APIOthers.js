import supabase from "./supabase";

export async function getOthers(){
	const{data, error} = await supabase
		.from('others')
		.select("*")

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}
	return data;
}

export async function getOthersExpenses(otherExpenseId){
	const{data, error} = await supabase
		.from('othersExpenses')
		.select()
		.eq('otherId', otherExpenseId)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}
	return data;
}

export async function getOthersReceipts(otherReceiptId){
	const {data, error} = await supabase
		.from('othersReceipts')
		.select()
		.eq('otherId', otherReceiptId)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}
	return data;
}

//Получает всю историю оплат и дат оплат из othersReceipts
export async function getAllOtherPayments(){
	const {data: otherPayments, error} = await supabase
		.from('othersReceipts')
		.select('totalPrice, dateOfPayment')

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории пополнений')
		}
	return otherPayments;
}

export async function createOther(newOther){
	// Проверяем не существует ли уже такая запись в таблице, чтобы не создать дубль
	const { data: others, error: othersErr } = await supabase
		.from('others')
		.select('otherName')

	if(othersErr){
		console.error(othersErr)
		throw new Error('Ошибка при получении наименований')
	}

	const findDuplicate = others.some((other)=>other.otherName === newOther.otherName)

	if(findDuplicate){
		throw new Error('Такое наименование уже существует в таблице')
	}
	const {data, error} = await supabase
		.from('others')
		.insert([newOther])
		.select()

		if(error){
			console.error(error)
			throw new Error('Не удалось создать строкув разделе "Разное"')
		}
	return data;
}

export async function updateOtherPlus(otherToUpdate){
	const {receivedQuantity, totalQuantity: previousValue, id} = otherToUpdate;
	const totalQuantity = Number(receivedQuantity) + previousValue;

	// Обновляем totalQuantity в таблице 'others'
	const { data: updateOtherData, error: updateOtherError } = await supabase
		.from('others')
		.update({ totalQuantity })
		.eq("id", id)
		.select()

		if(updateOtherError){
				console.error(updateOtherError)
				throw new Error('Ошибка пополнения количества')
			}

	const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = otherToUpdate;

	// Вставка данных в таблицу 'othersReceipts'
	const {data, error} = await supabase
		.from('othersReceipts')
		.insert([dataWithoutIdAndTotalQuantity])
		.select()

	if(error){
		console.error(error)

		// Откат к предыдущему значению в таблице 'indigo' если операция пополнения неуспешна
		const { data: rollbackData, error: rollbackError } = await supabase
			.from('others')
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

export async function updateOtherMinus(otherToUpdate){
	const {shippedQuantity, totalQuantity: previousValue, id} = otherToUpdate;
	const totalQuantity = previousValue - Number(shippedQuantity);

	// Записываем остаток за вычетом переданного кол-ва в totalQuantity в табл others
	const { data: updateOtherData, error: updateOtherError } = await supabase
		.from('others')
		.update({ totalQuantity })
		.eq("id", id)
		.select()

		if(updateOtherError){
			console.error(updateOtherError)
			throw new Error('Ошибка при попытке списания')
		}

	// Выкидываем id и totalQuantity, чтобы все поля передаваемого объекта соотв табл othersExpenses
	const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = otherToUpdate;

	// Делаем запись о списании в табл othersExpenses
	const {data, error} = await supabase
		.from('othersExpenses')
		.insert([dataWithoutIdAndTotalQuantity])
		.select()

		if(error){
			console.error(error)
			// Откат к предыдущему значению в таблице 'others' если операция добавления в othersExpenses неуспешна
			const { data: rollbackData, error: rollbackError } = await supabase
				.from('others')
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

export async function deleteOtherReceipt(id, otherId, receivedQuantity){
	// До удаления получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('othersReceipts')
		.select()
		.eq('id', id)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}

	const {error: deletedOtherReceiptError} = await supabase
		.from('othersReceipts')
		.delete()
		.eq('id', id)

		if(deletedOtherReceiptError){
			console.log(deletedOtherReceiptError)
			throw new Error('Строка поступления не была удалена')
		}

	// Для обновления кол-ва материала в табл others вначале получаем его текущее кол-во
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('others')
		.select('totalQuantity')
		.eq('id', otherId)

		if(totalQuantityItemError){
			console.log(totalQuantityItemError)
			await supabase.from('othersReceipts').insert(deletingData)
			throw new Error('Возникла проблема с обновлением общего количества')
		}

	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity - receivedQuantity;

	// Обновляем общее кол-во в табл others
	const {data, error: updateOthersTableError} = await supabase
		.from('others')
		.update({ totalQuantity })
		.eq("id", otherId)
		.select()

		if(updateOthersTableError){
			console.log(updateOthersTableError)
			await supabase.from('othersReceipts').insert(deletingData)
			throw new Error('Ошибка при изменении общего количества')
		}

	return data;
}

export async function deleteOtherExpense(id, otherId, shippedQuantity){
	// Вначале получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('othersExpenses')
		.select()
		.eq('id', id)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}
	// Удаляем строку расхода из таблицы в otherExpenses
	const {error: deleteOtherItemError} = await supabase
		.from('othersExpenses')
		.delete()
		.eq('id', id)

		if(deleteOtherItemError){
			console.log(deleteOtherItemError)
			throw new Error('Строка не была удалена')
		}
	// Получаем общее кол-во материала из табл others
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('others')
		.select('totalQuantity')
		.eq('id', otherId)

		if(totalQuantityItemError){
			console.log(totalQuantityItemError)
			await supabase.from('othersExpenses').insert(deletingData)
			throw new Error('Возникла проблема с обновлением общего количества')
		}

	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity + shippedQuantity;

	// Обновляем общее кол-во материала в табл others
	const {data, error: updateOthersTableError} = await supabase
		.from('others')
		.update({ totalQuantity })
		.eq("id", otherId)
		.select()

		if(updateOthersTableError){
			console.log(updateOthersTableError)
			await supabase.from('othersExpenses').insert(deletingData)
			throw new Error('Ошибка при удалении строки расхода')
		}

	return data;
}

export async function deleteOther(id){
	// Удаляет строку из others с каскадным удалением записей из таблиц othersExpenses и othersReceipts
	const { error } = await supabase
		.from('others')
		.delete()
		.eq('id', id)

	if(error){
		console.log(error)
		throw new Error('Ошибка при удалении строки')
	}
}