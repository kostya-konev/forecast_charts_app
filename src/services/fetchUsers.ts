import axios from 'axios';
import type {IUser} from "@/models";

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const { data } = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
    return data
  } catch (e) {
    console.log(e)
  }
};
