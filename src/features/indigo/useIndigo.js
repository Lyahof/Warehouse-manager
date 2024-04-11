import { useQuery } from "@tanstack/react-query";
import { getAllIndigoParts } from "../../services/APIIndigo";

export function useIndigo(){
	const { data: indigoItems, isLoading } = useQuery({
		queryKey: ["indigo"],
		queryFn: () => getAllIndigoParts(),
	});
	return {indigoItems, isLoading};
}