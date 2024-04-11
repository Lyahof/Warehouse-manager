import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOthersReceipts } from "../../services/APIOthers";

// Получает историю приходов по заданной позиции из таблицы others

export function useOtherReceipts(){
	const {otherReceiptId} = useParams();

	const {data, isLoading} = useQuery({
		queryKey: ['othersReceipts', otherReceiptId],
		queryFn: () => getOthersReceipts(otherReceiptId)
	})
	return {data, isLoading};
}