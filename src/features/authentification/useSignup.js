import { useMutation} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { signup as signupApi } from '../../services/APIAuth'

export function useSignup() {

  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password, fullName }) => signupApi({ email, password, fullName }),
    onSuccess: () => {
		toast.success('Новый ползователь успешно создан. На почту было отправлено письмо для подтверждения созданной учётной записи')
    },
  });

  return { signup, isPending };
}