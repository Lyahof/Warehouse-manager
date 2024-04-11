import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteOtherReceipt as deleteOtherReceiptApi } from "../../services/APIOthers";

// Удаляем строку получения в таблице othersReceipts
export function useDeleteOtherReceipt(){
	const queryClient = useQueryClient();

	const { mutate: deleteOtherReceipt, isPending } = useMutation({
		mutationFn: ({ id, otherId, receivedQuantity }) =>
		deleteOtherReceiptApi(id, otherId, receivedQuantity),
		onSuccess: () => {
		  queryClient.invalidateQueries("othersReceipts");
		  toast.success("Строка успешно удалена");
		},
		onError: (err) => toast.error(err.message),
	 });

	 return {deleteOtherReceipt, isPending};
}