import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './login-page.css'


// creating a fake login API with 1 seconds in delay
const LoginUser = async (loginData) => {
    const result = await axios.get('http://localhost:3004/usersData');
    const users = result.data
    return new Promise((res, rej) => {
        const verifyLogin = users.find(user => user.password === loginData.password && user.name === loginData.name)
        if (verifyLogin) return res(verifyLogin)
        return rej({ msg: "Invalid Credentials", statusCode: 301 })
    })
}
function Login({ history }) {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    // listeniing to change in the input field
    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // submiting form
    const submitForm = (e) => {
        e.preventDefault()
        const loginData = {
            ...formData
        }

        LoginUser(loginData).then(result => {
            history.push('/file-manager')
        })
            .catch(err => {
                alert(err.msg)
            })

    }
    return (
        <div className="text-center">
             <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
           
            <form onSubmit={(e) => submitForm(e)} className="form-signin">
                <p className="field">
               
                    <input type='text' placeholder="name" required onChange={(e) => onChangeHandler(e)} name="name" className="form-control mb-2" />
                    <i class="icon-user icon-large"></i>
                </p>
                <p className="field">
                    <input type='password' placeholder="password" required onChange={(e) => onChangeHandler(e)} name="password" className="form-control mb-2" />
                    </p>
                    <button class="btn btn-lg btn-primary btn-block" value="Login" type="submit">Sign in</button>
                    
                    <Link to="register"> Register </Link>
            </form>
        </div>
    )
}
export default Login