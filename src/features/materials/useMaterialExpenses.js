import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMaterialExpenses } from "../../services/APIMaterials";

// Получает историю приходов по заданной позиции из таблицы others
export function useMaterialExpenses(){
	const{materialExpenseId} = useParams();

	const {data: materialExpenses, isLoading} = useQuery({
		queryKey: ['materialsExpenses', materialExpenseId],
		queryFn: () => getMaterialExpenses(materialExpenseId)
	})

	return {materialExpenses, isLoading};
}