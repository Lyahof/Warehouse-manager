import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteOtherExpense as deleteOtherExpenseApi } from "../../services/APIOthers";

export function useDeleteOtherExpense(){
	const queryClient = useQueryClient()

	const {mutate: deleteOtherExpense, isPending} = useMutation({
		mutationFn: ({ id, otherId, shippedQuantity }) => deleteOtherExpenseApi(id, otherId, shippedQuantity),
		onSuccess: ()=> {
			queryClient.invalidateQueries('othersExpenses')
			toast.success('Строка успешно удалена')
		},
		onError: (err) => toast.error(err.message),
	})
	return {deleteOtherExpense, isPending};
}