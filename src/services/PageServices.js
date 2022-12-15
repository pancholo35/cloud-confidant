import Client from './api'

export const CreatePage = async (data) => {
  try {
    const res = await Client.post('/pages', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdatePage = async (data, id) => {
  try {
    const res = await Client.put(`/pages/${id}`, data)
    return res.data[1][0]
  } catch (error) {
    throw error
  }
}

export const DeletePage = async (id) => {
  try {
    const res = await Client.delete(`/pages/${id}`)
    return res
  } catch (error) {}
}
