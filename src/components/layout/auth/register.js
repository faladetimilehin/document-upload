import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import './login-page.css'

// Register New User
const registerUser = async ({name, password}) => {
        const config = {
            'Content-Type': 'application/json',
        };
        const body = {
            "id": name,
            "name": name,
            password: password,
            "fileUploaded": []
        };
        const result = await axios.post(
            `http://localhost:3004/usersData/`,
            body,
            config
        );
        return result
    }

// check if name exist
const CheckIfNameFound = async(name) => {
    const result = await axios.get('http://localhost:3004/usersData')
    const users = result.data
    const userFound = users.find(user=> user.name === name)
    return new Promise((res, rej) => {
        if(!userFound) {
            return res(true)
        }
        return rej({msg: "User Found"})
    })
}

function Register({history}) {
    const [formData, setFormData] = useState ({
        name: '',
        password: '',
        confirmPassword: ''
    })

    const { name, password, confirmPassword } = formData

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const submitForm = (e) =>{
        e.preventDefault()
        //  check if password are equal
        if(password !== confirmPassword) return alert("password not match")

        // check if name already exit
        CheckIfNameFound(name)
            .then(result=> registerUser({name, password})) // Call API to submit new USER
            .then(res=> history.push('/file-manager')) //  Redirect if successfull
            .catch(error=> {
                console.log(error)
                alert(error.msg)
            }) //  Throw an ALert if Error Found

    }

    return (
        <div className="text-center">
            <h3> Register Page</h3>
            <form onSubmit={(e)=> submitForm(e)} className="form-signin">
            <p className="field">
                <input type='text' required onChange={(e)=>onChangeHandler(e)} name="name" placeholder="name" className="form-control mb-2"/>
                </p>
                <p className="field">
                <input type='password' required onChange={(e)=>onChangeHandler(e)} name="password" placeholder="password" className="form-control mb-2"/>
                </p>
                <p className="field">
                <input type='password' required onChange={(e)=>onChangeHandler(e)} name="confirmPassword" placeholder="confirm password" className="form-control mb-2"/>
                </p>
                <button class="btn btn-lg btn-primary btn-block" value="Register" type="submit">Register</button>
                <Link to="login"> Login </Link>
            </form>
        </div>
    )
}

export default Register