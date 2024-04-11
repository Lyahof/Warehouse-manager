import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePaintReceipt as deletePaintReceiptApi } from "../../services/APIPaints";

export function useDeletePaintReceipt(){
	const queryClient = useQueryClient();

	const { mutate: deletePaintReceipt, isPending } = useMutation({
		mutationFn: ({ id, paintId, receivedQuantity }) => deletePaintReceiptApi(id, paintId, receivedQuantity),
		onSuccess: () => {
			queryClient.invalidateQueries("paintReceipts");
			toast.success("Строки расхода успешно удалена");
		},
		onError: (err) => toast.error(err.message),
		});

	return {deletePaintReceipt, isPending}
}