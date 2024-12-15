import axios from 'axios';
axios.defaults.baseURL = 'https://car-rental-by-quangminh-11e8a026c318.herokuapp.com/';

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