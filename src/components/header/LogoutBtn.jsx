import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-5 py-2 text-lg font-medium text-red-400 border border-transparent hover:border-red-600 hover:text-red-600 rounded-full transition-colors duration-300'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn