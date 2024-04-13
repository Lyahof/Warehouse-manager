import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateIndigoPlus as updateIndigoPlusApi } from "../../services/APIIndigo";

//Вызываем ф-ию updateIndigoPlus для добавления чего-либо в таблицу indigo через react-query
 export function useCreateIndigoReceipt(indigoName){
	const queryClient = useQueryClient();

	const { mutate: updateIndigoPlus, isPending } = useMutation({
		mutationFn: (data) => updateIndigoPlusApi(data),
		onSuccess: () => {
			toast.success(`Поступление ${indigoName} успешно добавлено в таблицу`);
			queryClient.invalidateQueries({ queryKey: ["indigo"] });
	},
		onError: (err) => toast.error(err.message),
	});

	return { updateIndigoPlus, isPending };
}