import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updatePaintMinus as  updatePaintMinusApi} from "../../services/APIPaints";

export function useCreatePaintExpence(paintName){
	const queryClient = useQueryClient();

	const { mutate: updatePaintMinus, isPending } = useMutation({
		mutationFn: (data) => updatePaintMinusApi(data),
		onSuccess: () => {
			toast.success(`Списание ${paintName} выполнено успешно`);
			queryClient.invalidateQueries({ queryKey: ["paints"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { updatePaintMinus, isPending };
}
