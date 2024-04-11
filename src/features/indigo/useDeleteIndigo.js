import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteIndigo as deleteIndigoApi } from "../../services/APIIndigo";

export function useDeleteIndigo(){
	const queryClient = useQueryClient();

	const { mutate: deleteIndigo, isPending: isDeleting } = useMutation({
		mutationFn: (id) => deleteIndigoApi(id),
		onSuccess: () => {
			toast.success("Строка успешно удалена");
			queryClient.invalidateQueries({queryKey: ["indigo"]});
		},
		onError: (err) => toast.error(err.message),
	});
	
	return { deleteIndigo, isDeleting };
}