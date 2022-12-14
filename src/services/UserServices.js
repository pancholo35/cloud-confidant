import Client from './api'

export const GetUser = async (id) => {
  try {
    const res = await Client.get(`/users/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
