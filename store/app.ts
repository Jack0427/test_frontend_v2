import type { User } from "~/types/user"
import { getUser, putUser, postUser, deleteUser } from "~/server/user"

export const useAppStore = defineStore('app', () => {
  const users = ref<User[]>([])
  
  const target = ref<User>()
  const loading = ref(false)
  
  const fetchUsers = async () => {
    try {
      loading.value = true
      const res = await getUser()
      users.value = res.data
      if(res.code !== 200) {
        console.error(res.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (user: User) => {
    try {
      loading.value = true
      const res = await putUser(user)

      if(res.code !== 200) {
        console.error(res.message)
      } else fetchUsers() 

    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      loading.value = true
      const res = await postUser(user)
      console.log(res)
      if(res.code !== 200) {
        console.error(res.message)
      } else fetchUsers() 
      
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const removeUser = async (id: Number) => {
    try {
      loading.value = true
      const res = await deleteUser({id})
      console.log(res)
      if(res.code !== 200) {
        console.error(res.message)
      } else fetchUsers() 
      
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    target,
    loading,
    fetchUsers,
    updateUser,
    addUser,
    removeUser
  }
})
