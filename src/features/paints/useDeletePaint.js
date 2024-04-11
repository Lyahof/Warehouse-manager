import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePaint as deletePaintApi } from "../../services/APIPaints";

export function useDeletePaint(){
	const queryClient = useQueryClient();

	const { mutate: deletePaint, isPending: isDeleting } = useMutation({
		mutationFn: (id) => deletePaintApi(id),
		onSuccess: () => {
			toast.success("Строка успешно удалена");
			queryClient.invalidateQueries({
				queryKey: ["paints"],
			});
		},
		onError: (err) => toast.error(err.message),
	});
	
	return { deletePaint, isDeleting }
}