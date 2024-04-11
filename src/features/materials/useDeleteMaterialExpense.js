import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteMaterialExpense as deleteMaterialExpenseApi } from "../../services/APIMaterials";

export function useDeleteMaterialExpense(){
	const queryClient = useQueryClient()

	const {mutate: deleteMaterialExpense, isPending} = useMutation({
		mutationFn: ({ id, materialId, shippedQuantity }) => deleteMaterialExpenseApi(id, materialId, shippedQuantity),
		onSuccess: ()=> {
			queryClient.invalidateQueries('materialsExpenses')
			toast.success('Строка успешно удалена')
		},
		onError: (err) => toast.error(err.message),
	})
	return {deleteMaterialExpense, isPending};
}