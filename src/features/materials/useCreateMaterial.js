import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNewMaterial as createNewMaterialApi } from "../../services/APIMaterials";

export function useCreateMaterial(){
	const queryClient = useQueryClient();

	const {mutate: createNewMaterial, isPending} = useMutation({
		mutationFn: (newMaterial) => createNewMaterialApi(newMaterial),
		onSuccess: () => {
			toast.success("Новая запись успешно создана и добавлена в таблицу");
			queryClient.invalidateQueries({ queryKey: ["materials"] });
		},
		onError: (err) => toast.error(err.message),
	})
	return {createNewMaterial, isPending};
}