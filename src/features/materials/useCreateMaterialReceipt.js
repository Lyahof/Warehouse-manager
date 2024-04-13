import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateMaterialPlus as updateMaterialPlusApi } from "../../services/APIMaterials";

//Вызываем ф-ию updateMaterialPlus для добавления чего-либо в таблицу materials через react-query
 export function useCreateMaterialReceipt(materialName){
	const queryClient = useQueryClient();

	const { mutate: updateMaterialPlus, isPending } = useMutation({
		mutationFn: (data) => updateMaterialPlusApi(data),
		onSuccess: () => {
			toast.success(`Поступление ${materialName} успешно добавлен в таблицу`);
			queryClient.invalidateQueries({ queryKey: ["materials"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateMaterialPlus, isPending };
}