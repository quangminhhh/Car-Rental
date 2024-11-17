import axios from 'axios';
import {message} from "antd";

axios.defaults.baseURL = 'http://localhost:8081';

export const bookCar = (reqObj ) => async dispatch => {
    dispatch({
        type: 'LOADING',
        payload: true
    })
    try{
        const response = await axios.post('/api/bookings/bookcar', reqObj);
        dispatch({
            type: 'LOADING',
            payload: false
        })
        message.success('Book Successfully');
        console.log('Booking successful', response.data);
    }
    catch(error){
        console.log(error);
        dispatch({
            type: 'LOADING',
            payload: false
        })
        message.error('Book Failure');
        throw error;
    }
}