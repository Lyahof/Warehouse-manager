import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteMaterial as deleteMaterialApi } from "../../services/APIMaterials";

// Удаляет материал из таблицы materials с каскадным удалением записей из таблиц приход и расход
export function useDeleteMaterial(){
	const queryClient = useQueryClient();

	const{mutate: deleteMaterial, isPending} = useMutation({
		mutationFn: (id) => deleteMaterialApi(id),
		onSuccess: () => {
			toast.success('Строка успешно удалена')
			queryClient.invalidateQueries({queryKey: ['materials']})
		},
		onError: (err) => toast.error(err.message)
	})
	return {deleteMaterial, isPending}
}
