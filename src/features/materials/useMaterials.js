import { useQuery } from "@tanstack/react-query";
import {getMaterials} from '../../services/APIMaterials';

// Получает все материалы из табл materials
export function useMaterials(){
	const { data: materials, isLoading } = useQuery({
		queryKey: ["materials"],
		queryFn: () => getMaterials(),
	});
	return {materials, isLoading};
}