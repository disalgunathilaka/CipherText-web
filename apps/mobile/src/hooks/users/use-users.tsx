import { request } from '../../utils/request';
import { useQuery } from '@tanstack/react-query';
import API from './constraints';

export function useUsers() {
  return useQuery(['users'], () =>
    request(
      {
        path: API.ALL_USERS.path,
        method: API.ALL_USERS.method,
      },
      null,
      true
    )
  );
}
