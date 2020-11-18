import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token; // thêm token vào header
    }
    else {
        delete axios.defaults.headers.common['Authorization']; // xóa token khi log out
    }
}


export default setAuthToken;