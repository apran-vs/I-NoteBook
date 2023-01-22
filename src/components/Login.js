import React, { useState } from "react";
import env from "react-dotenv";
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let nevigate = useNavigate();
    const host = env.REACT_APP_BACKEND_SERVER;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const respose = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await respose.json();
        // console.log(json);
        if(json.success){
            // save the auth-token and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Logged in Successfully!","success");
            nevigate("/");
        }
        else{
            props.showAlert("Invalid Details","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className="container mt-3">
            <h2>Login to continue to iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        value={credentials.email}
                        onChange={onChange}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={credentials.password}
                        onChange={onChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
