import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPaint as createPaintApi } from "../../services/APIPaints";

export function useCreatePaint(){
	const queryClient = useQueryClient();

	const { mutate: createPaint, isPending } = useMutation({
		mutationFn: (newPaint) => createPaintApi(newPaint),
		onSuccess: () => {
			toast.success("Новая запись успешно создана и добавлена в таблицу");
			queryClient.invalidateQueries({ queryKey: ["paints"] });
		},
		onError: (err) => toast.error(err.message),
		});

	return { createPaint, isPending }
}