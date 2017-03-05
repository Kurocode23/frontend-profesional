import fetch from 'isomorphic-fetch'

const baseUrl = 'http://jsonplaceholder.typicode.com'

const api = {
  post: {
    async getList (page = 1) {
      const response = await fetch(`${baseUrl}/post?_page=${page}`)
      const data = await response.json()
      return data;
    }
  },

  async getSingle (id = 1) {
    const response = await fetch(`${baseUrl}/posts/${id}`)
    const data = await response.json()
    return data
  },

  async getComments (id = 1) {
    const response = await fetch(`${baseUrl}/${id}/comments`)
    const data = await response.json()
    return data
  },

  async getUser (id = 1) {
    const response = await fetch(`${baseUrl}/users/${id}`)
    const data = await response.json()
    return data
  }
}

export default api
