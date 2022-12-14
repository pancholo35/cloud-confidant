import Client from './api'

export const GetJournal = async (id) => {
  try {
    const res = await Client.get(`/journals/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
