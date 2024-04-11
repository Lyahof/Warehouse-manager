import {useParams} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { getIndigoExpenses } from '../../services/APIIndigo';

export function useIndigoExpenses(){
	const {indigoExpenseId} = useParams();

	const {data: IndigoItemExpenses, isLoading} = useQuery({
		queryKey: ['indigoExpenses', indigoExpenseId],
		queryFn: () => getIndigoExpenses(indigoExpenseId),
	})
	
	return {IndigoItemExpenses, isLoading};
}