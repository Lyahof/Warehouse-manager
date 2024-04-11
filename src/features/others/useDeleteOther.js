import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteOther as deleteOtherApi } from "../../services/APIOthers";

// Вызываем ф-ию useDeleteOther для удаления строки из табл others с последующим удалением всех строк прихода и расхода 
// по этому наименованию в othersReceipts и othersExpenses

export function useDeleteOther(){
	const queryClient = useQueryClient();

	const{mutate: deleteOtherItem, isPending: isDeleting} = useMutation({
		mutationFn: (id)=>deleteOtherApi(id),
		onSuccess:()=> {
			toast.success("Строка успешно удалена");
			queryClient.invalidateQueries({queryKey: ['others']});
		},
		onError: (err)=> toast.err(err.message)
	})

	return {deleteOtherItem, isDeleting};
}