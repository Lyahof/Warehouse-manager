import {useMutation, useQueryClient} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateIndigoMinus as updateIndigoMinusApi } from "../../services/APIIndigo";

//Вызываем ф-ию updateIndigoMinus для отгрузки чего-либо из таблицы indigo через react-query
export function useCreateIndigoExpense(indigoName){
	const queryClient = useQueryClient();

	const{mutate: updateIndigoMinus, isPending} = useMutation({
		mutationFn: (data)=>updateIndigoMinusApi(data),
		onSuccess: ()=>{
			queryClient.invalidateQueries({queryKey: ['indigo']})
			toast.success(`${indigoName} успешно отгружена со склада`)
		},
		onError: (err)=> toast.error(err.message)
	})

	return {updateIndigoMinus, isPending};
}