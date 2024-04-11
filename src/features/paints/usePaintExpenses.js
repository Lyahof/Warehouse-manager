import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPaintExpenses } from "../../services/APIPaints";

export function usePaintExpenses(){
	const {paintIdExpense} = useParams();
	
	const {data: paintExpenses, isLoading} = useQuery({
		queryKey: ['paintExpenses', paintIdExpense],
		queryFn: () => getPaintExpenses(paintIdExpense),
	})

	return {paintExpenses, isLoading} 
}