import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updatePaintPlus as updatePaintPlusApi } from "../../services/APIPaints";

 export function useCreatePaintReceipt(paintName){
	const queryClient = useQueryClient();

	const { mutate: updatePaintPlus, isPending } = useMutation({
		mutationFn: (data) => updatePaintPlusApi(data),
		onSuccess: () => {
			toast.success(`Пополнение ${paintName} успешно добавлено в таблицу`);
			queryClient.invalidateQueries({ queryKey: ["paints"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return  { updatePaintPlus, isPending };
}