import {useMutation, useQueryClient} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateMaterialMinus as updateMaterialMinusApi } from "../../services/APIMaterials";

//Вызываем ф-ию updateOtherMinus для отгрузки чего-либо из таблицы others через react-query
export function useCreateMaterialExpense(materialName, materialWidth){
	const queryClient = useQueryClient();

	const{mutate: updateMaterialMinus, isPending} = useMutation({
		mutationFn: (data)=>updateMaterialMinusApi(data),
		onSuccess: ()=>{
			queryClient.invalidateQueries({queryKey: ['materials']})
			toast.success(`${materialName} ${materialWidth} мм успешно отгружен со склада`)
		},
		onError: (err)=> toast.error(err.message)
	})

	return {updateMaterialMinus, isPending};
}