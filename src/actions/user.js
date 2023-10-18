import axios from 'axios'
import { logout, setUser } from '../reducers/userReducer'
import { hideLoader } from '../reducers/appReducer'

export const registration = (email, password) => {

    return async dispatch => {
        try {
            await axios.post(`http://localhost:5000/api/auth/registration`, {
                email,
                password
            })
            
            dispatch(login(email, password))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}




export const login = (email, password) => {

    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })

            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
    
        } catch (e) {
            alert(e.response.data.message)
        }
    
    }


}

export const auth = () => {

    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})

            dispatch(setUser(response.data.user))
            dispatch(hideLoader())
            localStorage.setItem('token', response.data.token)
    
        } catch (e) {
            localStorage.removeItem('token')
            dispatch(logout())
        } finally{
            dispatch(hideLoader())

        }
    }
}