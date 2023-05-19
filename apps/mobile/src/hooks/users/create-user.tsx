import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '../../utils/request';
import API from './constraints';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: {
      firstName: string | undefined;
      lastName: string | undefined;
      email: string | undefined;
      password: string;
    }) =>
      request(
        {
          path: API.CREATE_USER.path,
          method: API.CREATE_USER.method,
        },
        {
          ...data,
        },
        true
      ),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        console.log(data);
      },
    }
  );
};
