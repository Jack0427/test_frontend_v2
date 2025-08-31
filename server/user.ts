import axios from 'axios';
import type { User } from '@/types/user';
import type { Response } from '@/types/response'

const baseUrl = 'https://38320.wu.elitepro.ltd/api'

//拿會員資料
export async function getUser(): Promise<Response<User[]>> {
  const res = await axios.get(`${baseUrl}/user`)
  return res.data
}
//修改會員資料
export async function putUser(data: User): Promise<Response<string>> {
  const res = await axios.put(`${baseUrl}/user`, { data })
  return res.data
}
//創建會員資料
export async function postUser(data: Omit<User, 'id'>): Promise<Response<Pick<User, 'id'>>> {
  const res = await axios.post(`${baseUrl}/user`, { data })
  return res.data
}
//刪除會員資料
export async function deleteUser(data: Pick<User, 'id'>): Promise<Response<string>> {
  const res = await axios.delete(`${baseUrl}/user`, { data })
  return res.data
}
