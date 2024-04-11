import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/APIAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
	 
    onSuccess: ({ user }) => {
      toast.success("Аккаунт успешно обновлён");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isPending };
}
