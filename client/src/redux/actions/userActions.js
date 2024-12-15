import axios from "axios";
import{message} from "antd";
axios.defaults.baseURL = 'http://localhost:8081';

export const userLogin=(reqObj)=>async dispatch => {
    dispatch({
        type: 'LOADING',
        payload: true
    })
    try{
        const response = await axios.post('/api/users/login', reqObj);
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login successfully');
        dispatch({
            type: 'LOADING',
            payload: false
        })
        setTimeout(()=>{
            window.location.href="/"
        },500)
    }
    catch(error){
        console.log(error);
        message.error('Login failed');
        dispatch({
            type: 'LOADING',
            payload: false
        })
    }
}
export const userRegister=(reqObj)=>async dispatch => {
    dispatch({
        type: 'LOADING',
        payload: true
    })
    try{
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post('api/users/register', reqObj);
        dispatch({
            type: 'LOADING',
            payload: false
        })
        message.success('Register successfully');
    }
    catch(error){
        console.log(error);
        message.error('Register failed');
        dispatch({
            type: 'LOADING',
            payload: false
        })
    }
}