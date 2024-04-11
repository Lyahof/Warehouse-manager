import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { login as loginApi } from '../../services/APIAuth';

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate('/dashboard', {replace: true});
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Введён неверный пароль или электронная почта');
    },
  });
  return { login, isPending };
}