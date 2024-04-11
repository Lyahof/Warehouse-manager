import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteIndigoReceipt as deleteIndigoReceiptApi } from "../../services/APIIndigo";

// Удаляем строку получения в таблице indigoReceipts
export function useDeleteIndigoReceipt(){
	const queryClient = useQueryClient();

	const { mutate: deleteIndigoReceipt, isPending } = useMutation({
		mutationFn: ({ id, indigoId, receivedQuantity }) =>
		deleteIndigoReceiptApi(id, indigoId, receivedQuantity),
		onSuccess: () => {
			queryClient.invalidateQueries("indigoReceipts");
			toast.success("Строка успешно удалена");
		},
		onError: (err) => toast.error(err.message),
	});

	return {deleteIndigoReceipt, isPending};
}