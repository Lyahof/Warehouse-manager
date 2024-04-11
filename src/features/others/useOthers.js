import { useQuery } from "@tanstack/react-query";
import { getOthers } from "../../services/APIOthers";

export function useOthers(){
	const { data: others, isLoading } = useQuery({
		queryKey: ["others"],
		queryFn: () => getOthers(),
	 });

	 return {others, isLoading}
}