import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPaintReceipts } from "../../services/APIPaints";

export function usePaintReceipts(){
	const {paintIdReceipt} = useParams();
	
	const {data, isLoading} = useQuery({
		queryKey: ['paintReceipts', paintIdReceipt],
		queryFn: () => getPaintReceipts(paintIdReceipt),
	})
	return {data, isLoading} 
}