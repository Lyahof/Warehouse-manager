import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createOther as createOtherApi } from "../../services/APIOthers";

export function useCreateOther(){
	const queryClient = useQueryClient();

	const { mutate: createOther, isPending } = useMutation({
		mutationFn: (newOther) => createOtherApi(newOther),
		onSuccess: () => {
		  toast.success("Новая запись успешно создана и добавлена в таблицу");
		  queryClient.invalidateQueries({ queryKey: ["others"] });
		},
		onError: (err) => toast.error(err.message),
	 });

	 return { createOther, isPending };
}