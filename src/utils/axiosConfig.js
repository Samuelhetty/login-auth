import axios from 'axios';

axios.defaults.withCredentials = true;

// You can also set other default configurations here, for example:
axios.defaults.baseURL = 'http://localhost:3000';

export default axios;