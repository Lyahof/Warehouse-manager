import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getIndigoReceipts } from "../../services/APIIndigo";

//Получает историю приходов по заданной позиции из таблицы indigo
export function useIndigoReceipts(){
	const {indigoReceiptId} = useParams();
	
	const {data, isLoading} = useQuery({
		queryKey: ['indigoReceipts', indigoReceiptId],
		queryFn: () => getIndigoReceipts(indigoReceiptId),
	})
	return {data, isLoading}; 
}