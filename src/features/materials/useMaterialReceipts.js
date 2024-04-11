import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMaterialReceipts } from "../../services/APIMaterials";

// Получает историю приходов по заданной позиции из таблицы others

export function useMaterialsReceipts(){
	const {materialReceiptId} = useParams();

	const {data, isLoading} = useQuery({
		queryKey: ['materialsReceipts', materialReceiptId],
		queryFn: () => getMaterialReceipts(materialReceiptId)
	})
	return {data, isLoading};
}