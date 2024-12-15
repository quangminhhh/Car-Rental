import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081';

export const getAllCars = () => async dispatch => {
    dispatch({
        type: 'LOADING',
        payload: true
    })
    try{
        const response = await axios.get('/api/luxury-cars');
        dispatch({
            type: 'GET_ALL_CARS',
            payload: response.data
        })
        dispatch({
            type: 'LOADING',
            payload: false
        })
    }
    catch(error){
        console.log(error);
        dispatch({
            type: 'LOADING',
            payload: false
        })
    }
}