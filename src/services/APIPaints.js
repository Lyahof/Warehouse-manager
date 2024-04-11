
import supabase from './supabase';

export async function getPaints(){
	const { data: paints, error } = await supabase
	.from('paints')
	.select('*')

	if(error){
		console.error(error)
		throw new Error('Ошибка загрузки таблицы "Краски/лаки/растворители')
	}
	return paints;
}

export async function getPaintReceipts(paintIdReceipt){
	const {data: paintReceipts, error} = await supabase
		.from('paintReceipts')
		.select()
		.eq('paintId', paintIdReceipt)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории пополнений')
		}
	return paintReceipts;
}

//Получает всю историю оплат и дат оплат из paintReceipts
export async function getAllPaintPayments(){
	const {data: paintPayments, error} = await supabase
		.from('paintReceipts')
		.select('totalPrice, dateOfPayment')

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории пополнений')
		}
	return paintPayments;
}

export async function getPaintExpenses(paintIdExpense){
	const {data: paintExpenses, error} = await supabase
		.from('paintExpenses')
		.select()
		.eq('paintId', paintIdExpense)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении истории списаний')
		}
	return paintExpenses;
}

export async function createPaint(newPaint){
	// Проверяем не существует ли уже такая запись в таблице, чтобы не создать дубль
	const { data: paints, error: paintErr } = await supabase
		.from('paints')
		.select('paintName')

  if(paintErr){
		console.error(paintErr)
		throw new Error('Ошибка при получении наименований')
	}

  const findDuplicate = paints.some((paint)=>paint.paintName === newPaint.paintName)

  if(findDuplicate){
		throw new Error('Такое наименование уже существует в таблице')
  }

	const { data, error } = await supabase
		.from('paints')
		.insert([newPaint])
		.select()

  if(error){
		console.error(error)
		throw new Error('Ошибка добавления новой строки в таблицу')
	}
	return data;
}

export async function updatePaintPlus(paintToUpdate){
	const {receivedQuantity, totalQuantity: previousValue, id} = paintToUpdate;
	const totalQuantity = Number(receivedQuantity) + previousValue;

	// Обновляем totalQuantity в таблице 'paints'
	const { data: updatePaintData, error: updatePaintError } = await supabase
		.from('paints')
		.update({ totalQuantity })
		.eq("id", id)
		.select()

		if(updatePaintError){
				console.error(updatePaintError)
				throw new Error('Ошибка пополнения количества')
		}

	const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = paintToUpdate;
	// Вставка данных в таблицу 'paintReceipts'
	const {data, error} = await supabase
		.from('paintReceipts')
		.insert([dataWithoutIdAndTotalQuantity])
		.select()

		if(error){
			console.error(error)
			// Откат к предыдущему значению в таблице 'materials' если операция пополнения неуспешна
			const { data: rollbackData, error: rollbackError } = await supabase
			.from('paints')
			.update({ totalQuantity: previousValue })
			.eq("id", id)
			.select()

			if(rollbackError){
				console.error(rollbackError)
			}
			throw new Error('Добавление в таблицу не было успешным')
		}
	return data;
}

export async function updatePaintMinus(paintToUpdate){
	const {shippedQuantity, totalQuantity: previousValue, id} = paintToUpdate;
	const totalQuantity = previousValue - Number(shippedQuantity);

	// Записываем остаток за вычетом переданного кол-ва в totalQuantity в табл paints
	const { data: updatePaintData, error: updatePaintError } = await supabase
	.from('paints')
	.update({ totalQuantity })
	.eq("id", id)
	.select()

	if(updatePaintError){
		console.error(updatePaintError)
		throw new Error('Ошибка при попытке списания')
	}

	// Выкидываем id и totalQuantity, чтобы все поля передаваемого объекта соотв полям табл paintExpenses
	const { id: idToDelete, totalQuantity: totalQuantityToDelete, ...dataWithoutIdAndTotalQuantity } = paintToUpdate;

	// Делаем запись о списании в табл materialsExpenses
	const {data, error} = await supabase
		.from('paintExpenses')
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
				}
			throw new Error('Ошибка списания из таблицы расходов')
		}

	return data;
}

export async function deletePaintReceipt(id, paintId, receivedQuantity){
	// До удаления получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('paintReceipts')
		.select()
		.eq('id', id)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}

	const {error: deletedPaintReceiptError} = await supabase
		.from('paintReceipts')
		.delete()
		.eq('id', id)

		if(deletedPaintReceiptError){
			console.log(deletedPaintReceiptError)
			throw new Error('Строка поступления не была удалена')
		}

	// Для обновления кол-ва материала в табл materials вначале получаем его текущее кол-во
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('paints')
		.select('totalQuantity')
		.eq('id', paintId)

		if(totalQuantityItemError){
			console.log(totalQuantityItemError)
			await supabase.from('paintReceipts').insert(deletingData)
			throw new Error('Возникла проблема с обновлением общего количества')
		}

	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity - receivedQuantity;

	// Обновляем общее кол-во в табл paints
	const {data, error: updatePaintTableError} = await supabase
		.from('paints')
		.update({ totalQuantity })
		.eq("id", paintId)
		.select()

		if(updatePaintTableError){
			console.log(updatePaintTableError)
			await supabase.from('materialsReceipts').insert(deletingData)
			throw new Error('Ошибка при удалении строки расхода')
		}

	return data;
}

export async function deletePaintExpense(id, paintId, shippedQuantity){
	// Вначале получаем удаляемый объект для возможности отката при возникновении ошибки
	const {data: deletingData, error} = await supabase
		.from('paintExpenses')
		.select()
		.eq('id', id)

		if(error){
			console.error(error)
			throw new Error('Ошибка при получении данных')
		}

	// Удаляем строку расхода из таблицы materialsExpenses
	const {error: deletePaintExpenseError} = await supabase
		.from('paintExpenses')
		.delete()
		.eq('id', id)

		if(deletePaintExpenseError){
			console.log(deletePaintExpenseError)
			throw new Error('Строка расхода не была удалена')
		}

	// Получаем общее кол-во материала из табл paints
	const { data: totalQuantityItem, error: totalQuantityItemError } = await supabase
		.from('paints')
		.select('totalQuantity')
		.eq('id', paintId)

		if(totalQuantityItemError){
			console.log(totalQuantityItemError)
			await supabase.from('paintExpenses').insert(deletingData)
			throw new Error('Возникла проблема с обновлением общего количества')
		}
			
	const previousTotalQuantity = totalQuantityItem.at(0).totalQuantity;
	const totalQuantity = previousTotalQuantity + shippedQuantity;
		
	// Обновляем общее кол-во материала в табл materials	
	const {data, error: updatePaintTableError} = await supabase
		.from('paints')
		.update({ totalQuantity })
		.eq("id", paintId)
		.select()

		if(updatePaintTableError){
			console.log(updatePaintTableError)
			await supabase.from('paintExpenses').insert(deletingData)
			throw new Error('Ошибка при удалении строки расхода')
		}

	return data;
}

export async function deletePaint(id) {
	// Удаляет строку из paints с каскадным удалением записей из таблиц paintExpenses и paintReceipts
	const { error } = await supabase
		.from('paints')
		.delete()
		.eq('id', id)

	if(error){
		console.log(error)
		throw new Error('Ошибка при удалении строки')
	}
}