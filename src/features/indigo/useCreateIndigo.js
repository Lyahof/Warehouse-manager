import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createIndigo as createIndigoApi } from "../../services/APIIndigo";

export function useCreateIndigo(){
	const queryClient = useQueryClient();

	const { mutate: createIndigo, isPending } = useMutation({
		mutationFn: (newIndigo) => createIndigoApi(newIndigo),
		onSuccess: () => {
			toast.success("Новая запись успешно создана и добавлена в таблицу");
			queryClient.invalidateQueries({ queryKey: ["indigo"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { createIndigo, isPending };
}