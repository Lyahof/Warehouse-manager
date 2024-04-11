import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateOtherPlus as updateOtherPlusApi } from "../../services/APIOthers";

//Вызываем ф-ию updateOtherPlus для добавления чего-либо в таблицу others через react-query
 export function useCreateReceiptOther(otherName){
	const queryClient = useQueryClient();

	const { mutate: updateOtherPlus, isPending } = useMutation({
	  mutationFn: (data) => updateOtherPlusApi(data),
	  onSuccess: () => {
		 toast.success(`${otherName} успешно добавлено в таблицу`);
		 queryClient.invalidateQueries({ queryKey: ["others"] });
	  },
	  onError: (err) => toast.error(err.message),
	});

	return { updateOtherPlus, isPending };
}