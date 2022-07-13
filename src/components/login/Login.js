import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [login, setLogin] = useState({ email: '', password: '' })

    const changeHandler = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let errors = validate(login)
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            navigate('/Home',{replace:true})
        };
    }

    const validate = (login) => {
        const errors = {}

        if (login.email === '') {
            errors.email = "please enter email"
        } else if (!validateEmail(login.email)) {
            errors.email = "please enter valid email"
        }
        if (login.password === '') {
            errors.password = "please enter password"
        } else if (!login.password.match(/[0-9]$/)) {
            errors.password = "password should contain only numbers"
        } else if (!validPassword(parseInt(login.password))) {
            errors.password = "sum of all digit should be 10"
        }
        return errors
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    const validPassword = (password) => {
        let sum = 0
        while (password) {
            sum = sum + password % 10
            password = Math.floor(password / 10)
        }
        return sum === 10
    }

    return (
        <div className="wrapper">
            <div className="form-content">
                <form onSubmit={submitHandler}>
                    <label className="label-login">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={changeHandler}
                    />
                    {errors?.email &&
                        <div className='error'>{errors?.email}</div>}
                    <label className="label-login">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={changeHandler}
                    />
                    {errors?.password &&
                        <div className='error'>{errors?.password}</div>}
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login