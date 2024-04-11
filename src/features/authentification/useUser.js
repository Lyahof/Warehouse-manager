import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/APIAuth";

// Авторизация
export function useUser(){
	const {isLoading, data: user} = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser
	})
	return {isLoading, user, isAuthentificated: user?.role === 'authenticated'};
}