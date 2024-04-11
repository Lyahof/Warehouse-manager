import {useParams} from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import { getOthersExpenses } from '../../services/APIOthers';

export function useOtherExpenses(){
	const {otherExpenseId} = useParams();

	const {data: otherExpenses, isLoading} = useQuery({
		queryKey: ['othersExpenses', otherExpenseId],
		queryFn: () => getOthersExpenses(otherExpenseId)
	})

	return {otherExpenses, isLoading};
}