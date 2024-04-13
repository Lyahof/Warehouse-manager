import {useMutation, useQueryClient} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateOtherMinus as updateOtherMinusApi } from "../../services/APIOthers";

//Вызываем ф-ию updateOtherMinus для отгрузки чего-либо из таблицы others через react-query
export function useCreateOtherExpense(otherName){
	const queryClient = useQueryClient();

	const{mutate: updateOtherMinus, isPending} = useMutation({
		mutationFn: (data)=>updateOtherMinusApi(data),
		onSuccess: ()=>{
			queryClient.invalidateQueries({queryKey: ['others']})
			toast.success(`${otherName} успешно отгружен со склада`)
		},
		onError: (err)=> toast.error(err.message)
	})

	return {updateOtherMinus, isPending};
}