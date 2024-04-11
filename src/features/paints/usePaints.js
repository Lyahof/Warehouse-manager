import { useQuery } from "@tanstack/react-query";
import { getPaints } from "../../services/APIPaints";

export function usePaints(){
	const { data: paints, isLoading } = useQuery({
		queryKey: ["paints"],
		queryFn: () => getPaints(),
	});

	return { paints, isLoading };
}