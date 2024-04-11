import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePaintExpense as deletePaintExpenseApi } from "../../services/APIPaints";

export function useDeletePaintExpense(){
	const queryClient = useQueryClient();

	const { mutate: deletePaintExpense, isPending } = useMutation({
		mutationFn: ({ id, paintId, shippedQuantity }) => deletePaintExpenseApi(id, paintId, shippedQuantity),

		onSuccess: () => {
			queryClient.invalidateQueries("paintExpenses");
			toast.success("Строки расхода успешно удалена");
		},
		onError: (err) => toast.error(err.message),
		});

	return {deletePaintExpense, isPending};
}

