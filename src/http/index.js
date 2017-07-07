import axios from 'axios'
import env from '../config/env'

//const ajaxUrl = env === 'development' ? 'http://127.0.0.1:8080' : env === 'production' ? 'https://www.url.com' : 'https://debug.url.com'
const ajaxUrl = env === 'development' ? 'http://localhost:8080' : env === 'production' ? 'https://www.url.com' : 'https://debug.url.com'
var ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
})

export default ajax