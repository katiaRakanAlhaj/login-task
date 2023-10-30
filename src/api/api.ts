import axios from 'axios';
import { TLogin, TUser } from './interfaces';
import { USER_ROUTE } from './route';

const getUsers = async () => {
  const { data } = await axios.get<TLogin[]>(USER_ROUTE.GET_ALL_USERS);
  return data;
};
const postUsers = async (data: TUser) => {
  const { data: responseData } = await axios.post<TUser>(
    USER_ROUTE.POST_USER,
    data
  );
  return responseData;
};
export const userApi = {
  getUsers,
  postUsers,
};
