import Client from './api'

export const CreatePage = async (data) => {
  try {
    const res = await Client.post('/pages', data)
    return res.data
  } catch (error) {
    throw error
  }
}
