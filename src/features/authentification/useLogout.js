import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient} from '@tanstack/react-query';

import { logout as logoutApi } from '../../services/APIAuth';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
		queryClient.removeQueries();
      navigate('/login', {replace: true});//{replace: true} стирает данные, чтобы нельзя было вернуться назад при помощи кнопки назад
    },
  });

  return { logout, isPending };
}