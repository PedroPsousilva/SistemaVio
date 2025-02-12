import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{'accpet':'application/json'}
});

const sheets ={
    postLogin:(user) => api.post("login/", user)
}

export default sheets;