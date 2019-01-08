import axios from 'axios'
import apiconfig from '../configs/api.config.json'


const API = {
    login: async (username, password) => {
    //login: async (data) => {
        //alert(apiconfig.BASE_URL+apiconfig.ENDPOINTS.LOGIN+' UN '+username+' PW '+password);
        const tmp = []
        /*tmp.push({
            "username": username,
            "password": password
        })
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.LOGIN,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepted-Language': 'application/json'
            },
            data: tmp
        }*/
        try {
            //let result = await axios(option)
            let result = await axios({method: 'POST',url:apiconfig.BASE_URL+apiconfig.ENDPOINTS.LOGIN,data:{username:username,password:password},headers: {
                'Content-Type': 'application/json',
                'Accepted-Language': 'application/json'
            }})
            //alert('test '+JSON.stringify(result))
            return result
        } catch (error) {
            //alert(error)
            return error.response.data

        }
    }
}

export default API