import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-16rem)] py-16">
        <div className={`mx-auto w-full max-w-lg bg-gray-900 rounded-xl p-12 text-white shadow-2xl border border-slate-900`}>
            <div className="mb-10 flex justify-center">
                <span className="inline-block w-full max-w-[150px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-4xl font-extrabold leading-tight text-white mb-4 tracking-tight">Create Your Account</h2>
            <p className="mt-4 text-center text-base text-slate-400">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-fuchsia-400 transition-colors duration-200 hover:underline hover:text-fuchsia-300"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-500 mt-8 text-center text-sm">{error}</p>}

            <form onSubmit={handleSubmit(create)} className='mt-12'>
                <div className='space-y-6'>
                    <Input
                    label="Full Name:"
                    placeholder="Enter your full name"
                    className="w-full bg-slate-900 border border-slate-800 text-gray-800 placeholder-slate-500 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none text-lg py-3 px-4 rounded-lg transition-all duration-200"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email:"
                    placeholder="email"
                    type="email"
                    className="w-full bg-slate-900 border border-slate-800 text-gray-800  placeholder-slate-500 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none text-lg py-3 px-4 rounded-lg transition-all duration-200"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password:"
                    type="password"
                    placeholder="password"
                    className="w-full bg-slate-900 border border-slate-800 text-gray-800 placeholder-slate-500 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none text-lg py-3 px-4 rounded-lg transition-all duration-200"
                    {...register("password", {
                        required: true,})}
                    />
                    <Button type="submit" className="w-full bg-fuchsia-600 text-white font-bold py-3.5 rounded-lg transition-colors duration-300 text-xl shadow-md hover:bg-fuchsia-700 hover:shadow-lg">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup