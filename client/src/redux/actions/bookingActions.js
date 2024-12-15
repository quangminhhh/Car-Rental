import axios from 'axios';
import {message} from "antd";

axios.defaults.baseURL = 'https://car-rental-by-quangminh-11e8a026c318.herokuapp.com/';

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