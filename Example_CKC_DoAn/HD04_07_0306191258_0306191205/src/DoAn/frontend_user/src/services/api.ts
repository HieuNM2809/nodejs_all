import axios from 'axios';

export default ()=>{
    return axios.create({
        baseURL:"https://careers-guidance-website.herokuapp.com/"
        // baseURL:"http://localhost:3001/"
    })
} 