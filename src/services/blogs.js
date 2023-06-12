import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const submitBlog = (blogObject) => {
  console.log(blogObject)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, submitBlog }