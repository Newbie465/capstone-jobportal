import axios from 'axios'
import { message } from 'antd'

export const registerUser = (values, response) => async dispatch =>{
    dispatch({type:'LOADING', payload: true});

    try{
        await axios.post('/api/users/register', values)
        message.success("User Registered Successfully")
        setTimeout(() => {
            window.location.href = '/login'
        }, 1000)
        dispatch({type:'LOADING', payload: false});
    }catch(error) {
        if(error.response){
            const msg = error.response.data
            message.error(msg['message'])
        }else{
            message.error("Something went wrong, Please try later!")
        }
        
        dispatch({type:'LOADING', payload: false});
    }
}

export const loginUser = (values) => async dispatch =>{
    dispatch({type:'LOADING', payload: true});

    try{
        const user = await axios.post('/api/users/login', values)
        message.success("User Logged-In Successfully")
        localStorage.setItem('user', JSON.stringify(user.data))
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
        dispatch({type:'LOADING', payload: false});
    }catch(error){
        if(error.response){
            const msg = error.response.data
            message.error(msg['message'])
        }else{
            message.error("Something went wrong, Please try later!")
        }
        dispatch({type:'LOADING', payload: false});
    }
}

export const updateUser = (values) => async dispatch =>{

    const userid = JSON.parse(localStorage.getItem('user'))._id

    values._id = userid
    dispatch({type:'LOADING', payload: true});

    try{
        const user = await axios.post('/api/users/update', values)
        message.success("User Updated Successfully")
        localStorage.setItem('user', JSON.stringify(user.data))
        setTimeout(() => {
            window.location.reload()
        }, 1000)
        dispatch({type:'LOADING', payload: false});
    }catch(error){
        if(error.response){
            const msg = error.response.data
            message.error(msg['message'])
        }else{
            message.error("Something went wrong, Please try later!")
        }
        dispatch({type:'LOADING', payload: false});
    }
}