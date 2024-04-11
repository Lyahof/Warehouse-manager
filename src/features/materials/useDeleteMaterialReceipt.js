import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteMaterialReceipt as deleteMaterialReceiptApi } from "../../services/APIMaterials";

// Удаляем строку получения в таблице materialsReceipts
export function useDeleteMaterialReceipt(){
	const queryClient = useQueryClient();

	const { mutate: deleteMaterialReceipt, isPending } = useMutation({
		mutationFn: ({ id, materialId, receivedQuantity }) =>
		deleteMaterialReceiptApi(id, materialId, receivedQuantity),
		onSuccess: () => {
			queryClient.invalidateQueries("materialsReceipts");
			toast.success("Строка успешно удалена");
		},
		onError: (err) => toast.error(err.message),
	});

	return {deleteMaterialReceipt, isPending};
}