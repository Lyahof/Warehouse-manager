import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteIndigoExpense as deleteIndigoExpenseApi } from "../../services/APIIndigo";

export function useDeleteIndigoExpense(){
	const queryClient = useQueryClient();

	const { mutate: deleteIndigoExpense, isPending } = useMutation({
		mutationFn: ({ id, indigoId, shippedQuantity }) => deleteIndigoExpenseApi(id, indigoId, shippedQuantity),
		onSuccess: () => {
			queryClient.invalidateQueries("indigoExpenses");
			toast.success("Строка успешно удалена");
		},
		onError: (err) => toast.error(err.message),
	});

	return {deleteIndigoExpense, isPending};
}