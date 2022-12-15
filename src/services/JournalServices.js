import Client from './api'

export const GetJournal = async (id) => {
  try {
    const res = await Client.get(`/journals/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateJournal = async (data) => {
  try {
    const res = await Client.post('/journals', data)
    return res.data
  } catch (error) {
    throw error
  }
}
